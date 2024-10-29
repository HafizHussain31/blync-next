import './styles.scss'
import React from "react";
import Lottie from "lottie-react";
import ExportedData from '../../assets';


const NoData = () => {

    return (
        <div>
            <div className='container-nodata'>

                <Lottie animationData={ExportedData.Lottie.noData} loop={true} className='lottie-no-data' />
            </div>
        </div>
    )

}


export default NoData;

