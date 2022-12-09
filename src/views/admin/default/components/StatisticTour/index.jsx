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
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    });
    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
    ]);

    return (
        <Box bg="none" w="500px">
            <Chart
                options={options}
                series={series}
                type="bar"
                width="1000"
            />
        </Box>
    );
};

export default StatisticTour;