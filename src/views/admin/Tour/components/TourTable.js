/* eslint-disable */
import {
    Badge, Box, Center,
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
import {ArrowRightIcon, CheckIcon, CloseIcon} from "@chakra-ui/icons";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getUserById} from "../../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";
import store from "../../../../redux/store";

export default function TourTable(props) {
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

    const handleClickToDetail = (data) => {
        const result = dispatch(getUserById(data));
        const currentUser = unwrapResult(result);
        history.push(`/admin/users/${data}`);
    }

    const handleCheckStatus = (data) => {
        console.log(data);
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
                    Users Table
                </Text>
                <Menu />
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
                                    if (cell.column.Header === "ID") {
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
                                    else if (cell.column.Header === "Chi phí") {
                                        data = (
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
                                            </Center>
                                        );
                                    }
                                    else if (cell.column.Header === "Trạng thái giám sát") {
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
                                            <Center color={textColor} fontSize='md' fontWeight='700'>
                                                {cell.value}
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
