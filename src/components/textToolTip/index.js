import './styles.scss'
import React from "react";
import Lottie from "lottie-react";
import { Switch, Tooltip } from 'antd';
import ExportedData from "../../assets";

const TextToolTip = (
    {
        text,
        tooltipText
    }
) => {

    return (
        <div>
            <Tooltip style={{
                backgroundColor: 'white'
            }} title={<div style={{
                backgroundColor: 'white',
                width: 'auto'
            }}>
                <>
                    <label style={{
                        color:'black'
                    }}>{tooltipText}</label>
                </>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">{text}</label>
            </Tooltip>
        </div>
    )

}


export default TextToolTip;

