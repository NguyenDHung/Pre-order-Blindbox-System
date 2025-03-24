import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';
function StatusTag({status="Pending", className = ""}) {
    const ComponentToRender = ()=>{
        switch(status){
            case "Active":
                return <Tag color="success">Active</Tag>
            case "Pending":
                return  <Tag icon={<ClockCircleOutlined />} color="default">
                waiting
              </Tag>
            case "Rejected":
                return <Tag color="error">error</Tag>
            default:
                return  <Tag icon={<ClockCircleOutlined />} color="default">
                waiting
              </Tag>
        }
    }
    return (  <div className={"mx-2 "+className}>
        <ComponentToRender/>
    </div>);
}

export default StatusTag;