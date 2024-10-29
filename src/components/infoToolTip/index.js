import './styles.scss'
import React from "react";
import { Tooltip } from 'antd';
import ExportedData from "../../assets";
const InfoToolTip = (
    {
        content
    }
) => {

    return (
        <div>
            <Tooltip title={<div style={{
                backgroundColor: 'white'
            }}>
                <label className='content-info'>{content}</label>

            </div>} placement="bottomRight" className='tooltip-container'>
                <img
                    src={ExportedData.Icons.notificationIcon}
                    alt="notification"
                    className="notification-table-icon"
                />
            </Tooltip>
        </div>
    )

}


export default InfoToolTip;

