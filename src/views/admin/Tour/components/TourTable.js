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

    const {TextArea} = Input;

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
    const [rejectReason, setRejectReason] = useState('');
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
                'Th??nh c??ng!',
                'B???n ???? duy???t tour n??y!',
                'success'
            )
        }
        catch (err) {
            await  Swal.fire({
                icon: 'error',
                title: '??i kh??ng...',
                text: `${err.message}`
            })
        }
        finally {
            await dispatch(getListTours())
            setOpen(false);
        }

    }

    const handleChangeReason = (e) => {
        setRejectReason(e.target.value);
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
                title: 'X??c nh???n h???y tour',
                icon: <ExclamationCircleOutlined />,
                content: <>L?? do <br/> <TextArea rows={4} placeholder="Nh???p l?? do..." maxLength={256} onChange={(e) => handleChangeReason(e)}/></>,
                okText: 'Ch???p nh???n',
                cancelText: 'H???y',
                onOk: async () => {
                    try {
                        await dispatch(rejectTour(tourChecked, rejectReason));
                        Swal.fire(
                            'Th??nh c??ng!',
                            'B???n ???? h???y tour n??y!',
                            'success'
                        )
                    }
                    catch (err) {
                        await Swal.fire({
                            icon: 'error',
                            title: '??i kh??ng...',
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
                    B???ng Tour
                </Text>
                <Flex>
                    <Button danger style={{width: '120px', marginRight: '10px'}} onClick={handleClickReject}>H???y tour</Button>
                    <Button type='primary' style={{width: '120px', marginRight: '10px'}} onClick={handleClickInspect}>Duy???t tour</Button>
                    <Button type='primary' style={{width: '160px'}} onClick={handleClickAddNew}>+ Th??m m???t tour m???i</Button>
                    <AddTourForm isOpen={isOpenAddForm} onCancel={onCancelAddForm}/>
                </Flex>
                <Modal
                    title="Nh???p th??ng tin c???n thi???t"
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
                            label="Ng?????i h?????ng d???n"
                            name="guider"
                            rules={[
                                {
                                    required: true,
                                    message: 'H??y nh???p th??ng tin ng?????i h?????ng d???n!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Chi ph??"
                            name="fee"
                            rules={[
                                {
                                    required: true,
                                    message: 'H??y nh???p th??ng tin chi ph??!',
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
                                    } else if (cell.column.Header === "Ng??y") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {moment(cell.value).format('DD/MM/YYYY')}
                                            </Center>
                                        );
                                    } else if (cell.column.Header === "T??n ng?????i d??ng") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    } else if (cell.column.Header === "S??? ??i???n tho???i") {
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
                                    else if (cell.column.Header === "S??? h??nh kh??ch") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Ghi ch??") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Chi ph??") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Tr???ng th??i") {
                                        if (cell.value === "pending") data = (
                                            <Center>
                                                <Tag color='green'>Ch??? duy???t</Tag>
                                            </Center>
                                        )
                                        else if (cell.value === "rejected") data = (
                                            // <Text color={cell.value === true ? 'purple' : '#6A1A15'} fontSize='md' fontWeight='700' onClick={() => handleCheckStatus(cell)}>
                                            //     {cell.value === true ? "???? gi??m s??t" : "Ch??a gi??m s??t"}
                                            // </Text>
                                            <Center>
                                                <Tag color='red'>???? h???y</Tag>
                                            </Center>
                                        )
                                        else data = (
                                                <Center>
                                                    <Tag color='blue'>???? duy???t</Tag>
                                                </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Ng?????i h?????ng d???n") {
                                        data = (
                                            <Center color={cell.value !== undefined ? textColor : '#6A1A15'} fontSize='md' fontWeight='700'>
                                                {cell.value !== undefined ? cell.value : 'Ch??a c??'}
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
