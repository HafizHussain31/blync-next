import React from "react";
import './styles.scss'
import Lottie from "lottie-react";
import ExportedData from '../../assets';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const NoPermission = () => {

    let navigate = useNavigate();

    const onClickNavigate = () => {
        navigate("/auth/login");
    }

    return (
        <div>
            <Lottie animationData={ExportedData.Lottie.forbidden} loop={true} className="no-permission" />
            <div className="permission-container">
                <p className="no-permission-text">You don't have permission to access this screen</p>
                {/* <NormalButton
                    label="Navigate to Authorized Screens"
                    loginBtn
                    onClick={() => onClickNavigate()}
                /> */}
            </div>
        </div>
    )
}

export default NoPermission;