/* eslint-disable */
import {
    Box,
    Center,
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
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import React, {useMemo, useState} from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import {ArrowRightIcon} from "@chakra-ui/icons";
import moment from "moment";
import {useDispatch} from "react-redux";
import {deleteUser, getListUsers, getUserById} from "../../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import store from "../../../../redux/store";
import {Button, Checkbox, Modal} from "antd";
import AddUserForm from "./AddUserForm";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from "sweetalert2";

export default function UserTable(props) {
    const { columnsData, tableData } = props;
    const [currentId, setCurrentId] = useState(null);

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const dispatch = useDispatch();
    const history = useHistory();

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
    const [isOpen, setIsOpen] = useState(false);

    const handleClickToDetail = (data) => {
        const result = dispatch(getUserById(data));
        const currentUser = unwrapResult(result);
        history.push(`/admin/users/${data}`);
    }

    const handleClickCheckbox = (e,row) => {
        if (e.target.checked === true) setCurrentId(row.original._id);
    }

    const handleAddUser = () => {
        setIsOpen(true);
    }

    const onDeleteUser = () => {
        if (currentId) {
            Modal.confirm({
                title: 'X??c nh??n',
                icon: <ExclamationCircleOutlined />,
                content: 'B???n c?? ch???c ch???c b???n mu???n x??a user n??y ?',
                okText: 'X??a',
                cancelText: 'H???y',
                onOk: async () => {
                    try {
                        await dispatch(deleteUser(currentId));
                        Swal.fire(
                            'Th??nh c??ng!',
                            'B???n ???? x??a user n??y!',
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
                        await dispatch(getListUsers());
                    }
                },
            });
        }
    }

    const handleCancel = () => {
        setIsOpen(false);
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
                    B???ng User
                </Text>
                <Box>
                    <Button danger size='md' onClick={onDeleteUser}>X??a User</Button>
                    <Button
                        type='primary'
                        size='md'
                        style={{marginLeft: '10px'}}
                        onClick={handleAddUser}
                    >
                        + Th??m m???t User
                    </Button>
                    <AddUserForm isOpen={isOpen} onCancel={handleCancel}/>
                </Box>
                {/*<Menu />*/}
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    {/*<Flex*/}
                                    {/*    justify='space-between'*/}
                                    {/*    align='center'*/}
                                    {/*    fontSize={{ sm: "10px", lg: "12px" }}*/}
                                    {/*    color='gray.400'>*/}
                                    {/*    */}
                                    {/*</Flex>*/}
                                    <Center color='gray.400'>
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
                                            // <Center color={textColor} fontSize='md' fontWeight='700'>
                                            //     {cell.value}
                                            // </Center>
                                           <Center>
                                               <Checkbox onChange={(e) => handleClickCheckbox(e,row)}></Checkbox>
                                           </Center>
                                        );
                                    } else if (cell.column.Header === "Email") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    } else if (cell.column.Header === "H??? t??n") {
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
                                    else if (cell.column.Header === "Ng??y sinh") {
                                        data = (
                                        <Center color={textColor} fontSize='md' fontWeight='700'>
                                            {moment(cell.value).format('DD/MM/YYYY')}
                                        </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Chi ti???t") {
                                        data = (
                                            // <Text color={textColor} fontSize='sm' fontWeight='700'>
                                            //     {cell.value}
                                            // </Text>
                                            <Center>
                                                <ArrowRightIcon cursor="pointer" onClick={() => handleClickToDetail(cell.row.allCells[0].value)}></ArrowRightIcon>
                                            </Center>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
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
