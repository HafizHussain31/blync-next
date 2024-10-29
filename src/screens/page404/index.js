import React from "react";
import './styles.scss'
import Lottie from "lottie-react";
import ExportedData from '../../assets';
const Page404 = () => {

    return (
        <div>
            <Lottie animationData={ExportedData.Lottie.page404} loop={true} className="page-404" />
        </div>
    )
}

export default Page404;