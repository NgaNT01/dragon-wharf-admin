import React from 'react';
import { Space, Table, Tag } from 'antd';
import {ArrowRightIcon} from "@chakra-ui/icons";
const { Column, ColumnGroup } = Table;

const UsersTable = (props) => {
    const {data} = props;

    const handleClickToDetail = (data) => {
        console.log(data);
    }

    return (
        <Table dataSource={data}>
            <Column title="ID" dataIndex="_id" key="_id" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Phone" dataIndex="phone" key="phone" />
            <Column title="Date of birth" dataIndex="dob" key="dob" />
            <Column
                title="Detail"
                key="detail"
                render={(_, record) => (
                    <Space size="middle" >
                        <ArrowRightIcon onClick={() => handleClickToDetail(record)}></ArrowRightIcon>
                    </Space>
                )}
            />
        </Table>
    );
};

export default UsersTable;