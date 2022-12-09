import React from 'react';
import {Box} from "@chakra-ui/react";
import {useSelector} from "react-redux";

const UserDetails = () => {
    const currentUser = useSelector(state => state.auth.currentUser);

    return (
        <Box marginTop="200px">
           this is user detail {currentUser._id}
        </Box>
    );
};

export default UserDetails;