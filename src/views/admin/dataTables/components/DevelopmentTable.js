/* eslint-disable */
import {
  Center,
  Flex,
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
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import moment from "moment";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
          Reports Table
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
                  {/*<Flex*/}
                  {/*  justify='space-between'*/}
                  {/*  align='center'*/}
                  {/*  fontSize={{ sm: "10px", lg: "12px" }}*/}
                  {/*  color='gray.400'>*/}
                  {/*  */}
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
                  if (cell.column.Header === "ID") {
                    data = (
                      <Center color={textColor} fontSize='md' fontWeight='700'>
                        {cell.value}
                      </Center>
                    );
                  } else if (cell.column.Header === "Email") {
                    data = (
                        <Center color={textColor} fontSize='md' fontWeight='700'>
                          {cell.value}
                        </Center>
                    );
                  } else if (cell.column.Header === "Type") {
                    data = (
                      <Center color={textColor} fontSize='md' fontWeight='700'>
                        {cell.value}
                      </Center>
                    );
                  } else if (cell.column.Header === "Content") {
                    data = (
                        <Center color={textColor} fontSize='md' fontWeight='700'>
                          {cell.value}
                        </Center>
                    );
                  }
                  else if (cell.column.Header === "Created At") {
                    data = (
                        <Center color={textColor} fontSize='md' fontWeight='700'>
                          {moment(cell.value).format('DD/MM/YYYY')}
                        </Center>
                    );
                  }
                  else if (cell.column.Header === "Updated At") {
                    data = (
                        <Center color={textColor} fontSize='md' fontWeight='700'>
                          {moment(cell.value).format('DD/MM/YYYY')}
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
