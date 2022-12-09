import React, {useEffect, useState} from 'react';
import {Box, Spinner} from "@chakra-ui/react";
import {useSelector} from "react-redux";

const UserDetails = () => {
    const isLoading = useSelector(state => state.auth.isLoading);
    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <Box marginTop="200px">
            {isLoading === true ? <Spinner thickness='4px'
                                            speed='0.85s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                            position="absolute"
                                            right="800px"
            ></Spinner> : <Box>This is user {currentUser._id}</Box>}

        </Box>
    );
};

export default UserDetails;