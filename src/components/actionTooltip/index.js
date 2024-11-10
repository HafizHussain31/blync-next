import './styles.scss'
import React from "react";
import Lottie from "lottie-react";
import { Switch, Tooltip } from 'antd';
import ExportedData from "../../assets";

const ActionTooltipComponent = (
    {
        onClickDelete,
        onClickEdit,
    }
) => {

    return (
        <div>
            <Tooltip style={{
                backgroundColor: 'white'
            }} title={<div style={{
                backgroundColor: 'white'
            }}>
                <>

                    <div onClick={() => onClickEdit()} className="edit-icon-container">
                        <img
                            src={ExportedData.Icons.edit}
                            className="edit-icon" />
                        <span className="tooletip_icon">Edit</span>
                    </div>
                    <div className="horizontal-line" />
                    <div onClick={() => onClickDelete()} className="icon-container">
                        <img
                            src={ExportedData.Icons.delete}
                            className="edit-icon" />
                        <span className="tooletip_icon">Delete</span>
                    </div>
                </>
            </div>} placement="bottomRight">
                <label className="tooletip_lable">...</label>
            </Tooltip>
        </div>
    )

}


export default ActionTooltipComponent;

