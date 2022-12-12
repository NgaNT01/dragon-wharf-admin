/* eslint-disable */
import {
    Badge, Box,  Center,
    Flex, Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import {Checkbox, Modal, Form, Input, notification} from 'antd';
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import React, {useEffect, useMemo, useState} from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {ArrowRightIcon, CheckIcon, CloseIcon} from "@chakra-ui/icons";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import store from "../../../../redux/store";
import {Button} from "antd";
import {inspectTour} from "../../../../redux/tourSlice";

export default function TourTable(props) {
    const { columnsData, tableData } = props;
    const [currentId, setCurrentId] = useState(null);

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 11;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("secondaryGray.500", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    const [tourChecked, setTourChecked] = React.useState(null)
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = (e) => {
        setOpen(false);
        form.setFieldsValue('');
    };

    const handleClickToDetail = (data) => {
        const result = dispatch(getUserById(data));
        const currentUser = unwrapResult(result);
        history.push(`/admin/users/${data}`);
    }

    const onFinishFailed = () => {

    }

    const onFinish = (data) => {
        const payload = {
            tourId: tourChecked,
            guider: data.guider,
            fee: data.fee
        };
        const result = dispatch(inspectTour(payload));
        setOpen(false);
    }

    const handleClickInspect = () => {
     if (tourChecked !== null) showModal();
    }

    const setCheckedList = (event, row) => {
        if (event.target.checked === true) setTourChecked(row.original._id);
        else if (event.target.checked === false) setTourChecked(null);
        form.setFieldsValue(' ');
    }


    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Bảng Tour
                </Text>
                <Button type='primary' style={{width: '120px'}} onClick={handleClickInspect}>Giám sát</Button>
                <Modal
                    title="Nhập thông tin cần thiết"
                    open={open}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <Form
                        form={form}
                        name="form"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Người hướng dẫn"
                            name="guider"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập thông tin người hướng dẫn!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Chi phí"
                            name="fee"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập thông tin chi phí!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    key={index}
                                    borderColor={borderColor}>
                                    <Center color='gray.400'>
                                        {/*<Flex*/}
                                        {/*    justify='space-between'*/}
                                        {/*    align='center'*/}
                                        {/*    fontSize={{ sm: "10px", lg: "12px" }}*/}
                                        {/*    color='gray.400'>*/}
                                        {/*    */}
                                        {/*</Flex>*/}
                                        {column.render("Header")}
                                    </Center>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "") {
                                        data = (
                                            // <Text color={textColor} fontSize='md' fontWeight='700'>
                                            //     {cell.value}
                                            // </Text>
                                            <Center>
                                                {row.original.inspected === false ? <Checkbox onChange={(e) => {
                                                    // setCheckedItems(prev => prev.push(e.target.value));
                                                    setCheckedList(e, row);
                                                }}></Checkbox> : null}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "ID") {
                                        data = (
                                            <Text color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Ngày") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {moment(cell.value).format('DD/MM/YYYY')}
                                            </Center>
                                        );
                                    } else if (cell.column.Header === "Tên người dùng") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    } else if (cell.column.Header === "Số điện thoại") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Email") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Số hành khách") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Ghi chú") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Chi phí") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Trạng thái duyệt") {
                                        data = (
                                            // <Text color={cell.value === true ? 'purple' : '#6A1A15'} fontSize='md' fontWeight='700' onClick={() => handleCheckStatus(cell)}>
                                            //     {cell.value === true ? "Đã giám sát" : "Chưa giám sát"}
                                            // </Text>
                                            <Center>
                                                {cell.value === true ? <CheckIcon margin='auto' fontSize='18px' color={textColor}></CheckIcon> : <CloseIcon color='#6A1A15'></CloseIcon>}
                                            </Center>

                                        );
                                    }
                                    else if (cell.column.Header === "Người hướng dẫn") {
                                        data = (
                                            <Center color={cell.value !== undefined ? textColor : '#6A1A15'} fontSize='md' fontWeight='700'>
                                                {cell.value !== undefined ? cell.value : 'Chưa có'}
                                            </Center>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'
                                            alignSelf='center'
                                            align='center'
                                            alignItems='center'
                                        >
                                                {data}

                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}
