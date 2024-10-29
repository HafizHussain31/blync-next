import axios from 'axios';
import { getRefreshTokenRequest, getRememberMeStatus, getTokenFromStore, getUserDataFromStore } from '../utils';
import Exported from './endpoints';
import { store } from '../redux/store';
// import { saveUserData } from '../redux/reducers/authSlice';
import { Toast } from '../components/toast';
import LoaderRef from "../components/loader";

const baseURL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({
  baseURL,
});

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((promResolve) => {
    if (error) {
      promResolve.reject(error);
    } else {
      promResolve.resolve(token);
    }
  });
  refreshQueue = [];
};

const request = async ({ url, method, data, isLoader = true, headers }) => {
  try {
    const accessToken = getTokenFromStore();
    const config = {
      url: url,
      method,
      data: data ? data : null,
      headers: {
        ...headers,
        Authorization: accessToken ? `${accessToken}` : '',
      },
    };
    if(isLoader){
      showLoader(isLoader);
    }
    const response = await axiosInstance(config);
    if(isLoader){
      showLoader(false);
    }
    return response;
  } catch (error) {
    if(isLoader){
      showLoader(false);
    }
    const originalRequest = error.config;

    let isRememberMe = getRememberMeStatus();

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRememberMe) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshToken = getRefreshTokenRequest();
            showLoader(true);
            const refreshResponse = await axios.post(baseURL + Exported.Endpoints.REFRESH_TOKEN, {
              ...refreshToken,
            });
            showLoader(false);
            const newAccessToken = refreshResponse.data.data.accessToken;

            let userData = getUserDataFromStore();
            let updatedUserData = {
              ...userData,
              accessToken: newAccessToken,
            };

            // store.dispatch(saveUserData(updatedUserData));

            originalRequest.headers.Authorization = `${newAccessToken}`;
            originalRequest._retry = true;

            const retryResponse = await axiosInstance(originalRequest);

            processQueue(null, newAccessToken);
            return retryResponse;
          } catch (refreshError) {
            showLoader(false)
            window.location.href = "/auth/login";
            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        } else {
          showLoader(false)
          return new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }
      } else {
        showLoader(false)
        window.location.href = "/auth/login";
      }
    } else {
      showLoader(false)
      let { data } = error.response;
      let { message } = data;
      Toast({ type: "error", message: message });
    }

    throw error;
  }
};

const showLoader = (status) => {
  if (LoaderRef && LoaderRef.render && LoaderRef.render.defaultProps) {
    LoaderRef.render.defaultProps.setLoaderStatus(status);
  }
};

export default request;
