import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import { getComponentFromPath } from '../utils';

const PrivateRoute = ({ element }) => {

    const userData = useSelector((state) => state?.auth?.userData);

    const navigate = useNavigate();

    const location = useLocation();


    // useEffect(() => {
    //     let path = location.pathname;

    //     if (path != '/main/profile-settings' && path != '/main/notification' && !path.includes("auth")) {
    //         if (userData && Object.keys(userData).length > 0) {
    //             let permission = [...userData?.permissions];
    //             let component = getComponentFromPath("childPath", path);

    //             if (component) {
    //                 let filter = permission.filter(it => it.module == component?.permissionKey && it.isView)[0];
                    
    //                 if (!filter) {
    //                     navigate('/no-permission')
    //                 }

    //                 if(filter && filter?.module != component?.screen && (component?.screen.includes("Create") || component?.screen.includes("Edit") || component?.screen.includes("Add"))){
    //                     let filterEdit = permission.filter(it => it.module == component?.permissionKey && it.isEdit)[0];

    //                     if (!filterEdit) {
    //                         navigate('/no-permission')
    //                     }
    //                 }
    //             }
    //         }
    //     }

    // }, [navigate]);

    return <>{element}</>
};

export default PrivateRoute;
