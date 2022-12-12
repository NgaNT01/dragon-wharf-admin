import React, {useState} from 'react';
import {Box, Spinner} from "@chakra-ui/react";
import Chart from "react-apexcharts";

const StatisticTour = () => {
    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        title: {
            text: "Biểu đồ thống kê số lượng Tour theo tháng",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#263238'
            },
        },
        xaxis: {
            categories: ['09/2022','10/2022','11/2022','12/2022'],
            fontSize: '30px'
        }
    });
    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: [1,5,4,33]
        }
    ]);

    return (
        <Box bg="none" w="500px" marginTop="70px">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="800"
            />
        </Box>
    );
};

export default StatisticTour;