import React, {useState} from 'react';
import {Box} from "@chakra-ui/react";
import Chart from "react-apexcharts";

const StatisticReport = () => {
    const [options, setOptions] = useState({
        dataLabels: {
            enabled: true,
        },
        labels: ['Tour','Other','Service'],
        pie: {
            donut: {
                size: '65%',
                labels: {
                    show: true,
                    name: {
                        show: true,
                    },
                    value: {
                        show: true,
                    },
                }
            }
        },
        title: {
            text: "Biểu đồ thống kê tỉ lệ các loại Report",
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
    });
    const [series, setSeries] = useState([2,2,3]);

    return (
        <Box w="500px" marginTop="70px" marginRight='120px'>
            <Chart options={options} series={series} type="donut"  width="600" />
        </Box>
    );
};

export default StatisticReport;