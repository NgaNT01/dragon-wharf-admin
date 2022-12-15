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
import {Checkbox, Modal, Form, Input, notification, Tag} from 'antd';
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
import {deleteUser, getListUsers, getUserById} from "../../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import store from "../../../../redux/store";
import {Button} from "antd";
import {getListTours, inspectTour, rejectTour} from "../../../../redux/tourSlice";
import Swal from "sweetalert2";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import AddTourForm from "./AddTourForm";

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
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
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

    const onFinish = async (data) => {
        try {
            const payload = {
                tourId: tourChecked,
                guider: data.guider,
                fee: data.fee
            };
            await dispatch(inspectTour(payload));
            Swal.fire(
                'Thành công!',
                'Bạn đã duyệt tour này!',
                'success'
            )
        }
        catch (err) {
            await  Swal.fire({
                icon: 'error',
                title: 'Ôi không...',
                text: `${err.message}`
            })
        }
        finally {
            await dispatch(getListTours())
            setOpen(false);
        }

    }

    const handleClickInspect = () => {
     if (tourChecked !== null) showModal();
    }

    const handleClickAddNew = () => {
        setIsOpenAddForm(true);
    }

    const handleClickReject = () => {
        if (tourChecked) {
            Modal.confirm({
                title: 'Xác nhân',
                icon: <ExclamationCircleOutlined />,
                content: 'Bạn có chắc chắc muốn hủy tour này ?',
                okText: 'Chấp nhận',
                cancelText: 'Hủy',
                onOk: async () => {
                    try {
                        await dispatch(rejectTour(tourChecked));
                        Swal.fire(
                            'Thành công!',
                            'Bạn đã xóa user này!',
                            'success'
                        )
                    }
                    catch (err) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Ôi không...',
                            text: `${err.message}`
                        })
                    }
                    finally {
                        await dispatch(getListTours());
                    }
                },
            });
        }
    }

    const setCheckedList = (event, row) => {
        if (event.target.checked === true) setTourChecked(row.original._id);
        else if (event.target.checked === false) setTourChecked(null);
        form.setFieldsValue(' ');
    }

    const onCancelAddForm = () => {
        setIsOpenAddForm(false);
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
                <Flex>
                    <Button danger style={{width: '120px', marginRight: '10px'}} onClick={handleClickReject}>Hủy tour</Button>
                    <Button type='primary' style={{width: '120px', marginRight: '10px'}} onClick={handleClickInspect}>Duyệt tour</Button>
                    <Button type='primary' style={{width: '160px'}} onClick={handleClickAddNew}>+ Thêm một tour mới</Button>
                    <AddTourForm isOpen={isOpenAddForm} onCancel={onCancelAddForm}/>
                </Flex>
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
                                                {row.original.status === "pending" ? <Checkbox onChange={(e) => {
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
                                    else if (cell.column.Header === "Trạng thái") {
                                        if (cell.value === "pending") data = (
                                            <Center>
                                                <Tag color='green'>Chờ duyệt</Tag>
                                            </Center>
                                        )
                                        else if (cell.value === "rejected") data = (
                                            // <Text color={cell.value === true ? 'purple' : '#6A1A15'} fontSize='md' fontWeight='700' onClick={() => handleCheckStatus(cell)}>
                                            //     {cell.value === true ? "Đã giám sát" : "Chưa giám sát"}
                                            // </Text>
                                            <Center>
                                                <Tag color='red'>Đã hủy</Tag>
                                            </Center>
                                        )
                                        else data = (
                                                <Center>
                                                    <Tag color='blue'>Đã duyệt</Tag>
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
