
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
    columnsDataReports
} from "views/admin/Reports/variables/columnsData";
import tableDataDevelopment from "views/admin/Reports/variables/tableDataDevelopment.json";
import React from "react";

export default function Reports() {
    // Chakra Color Mode
    return (
        <Box pt={{ base: "500px", md: "80px", xl: "80px" }}>
                <DevelopmentTable
                    columnsData={columnsDataReports}
                    tableData={tableDataDevelopment}
                />
        </Box>
    );
}
