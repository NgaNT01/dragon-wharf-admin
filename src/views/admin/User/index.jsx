
// Chakra imports
import {Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import {
    columnsDataUser
} from "views/admin/User/variables/columnsData";
import tableDataDevelopment from "views/admin/User/variables/tableDataUser.json";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserTable from "./components/UserTable";
import {getListUsers} from "../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import UsersTable from "./components/UsersTable";

export default function User() {
    const dispatch = useDispatch();
    const [listUsers, setListUsers] = useState([]);
    const isLoading = useSelector(state => state.auth.isLoading)
    const current = useSelector(state => state.auth.current)

    useEffect(async () => {
        const result =await dispatch(getListUsers());
        const users = unwrapResult(result);
        // setListUsers(users);
    },[])

    useEffect(() => {
        setListUsers(current);
    })

    // Chakra Color Mode
    return (
        <Box pt={{ base: "500px", md: "80px", xl: "80px" }}>

            {/*<UsersTable data={listUsers}></UsersTable>*/}
            {isLoading === true ? <Spinner thickness='4px'
                                            speed='0.85s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                            position="absolute"
                                            right="800px"
                                            top="300px"
            ></Spinner> : <UserTable
                columnsData={columnsDataUser}
                tableData={listUsers}
            />}
        </Box>
    );
}
