
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
    columnsDataUser
} from "views/admin/User/variables/columnsData";
import tableDataDevelopment from "views/admin/User/variables/tableDataUser.json";
import React from "react";
import UserTable from "./components/UserTable";

export default function User() {
    // Chakra Color Mode
    return (
        <Box pt={{ base: "500px", md: "80px", xl: "80px" }}>
            <UserTable
                columnsData={columnsDataUser}
                tableData={tableDataDevelopment}
            />
        </Box>
    );
}
