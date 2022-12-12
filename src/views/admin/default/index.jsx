
// Assets
// Custom components
import React from "react";
import {Box, Flex} from "@chakra-ui/react";
import StatisticTour from "./components/StatisticTour";
import StatisticReport from "./components/StatisticReport";

export default function UserReports() {
  return (
          <Box pt={{ base: "600px", md: "100px", xl: "100px" }}>
              <Flex justifyContent='space-between'>
                  <StatisticTour></StatisticTour>
                  <StatisticReport></StatisticReport>
              </Flex>
          </Box>

  );
}
