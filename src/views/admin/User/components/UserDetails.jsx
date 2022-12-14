import React, {useEffect, useState} from 'react';
import {Box, Flex, Icon, Spinner, Text, useColorModeValue} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import Card from "../../../../components/card/Card";
import {HSeparator} from "../../../../components/separator/Separator";
import moment from "moment";
import {Button} from "antd";
import EditUserForm from "./EditUserForm";

const UserDetails = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const isLoading = useSelector(state => state.auth.isLoading);
    const currentUser = useSelector(state => state.auth.currentUser);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [currentUser])

    const onEditProfile = () => {
        setIsOpen(true);

    }

    const onCancel = () => {
        setIsOpen(false);
    }

    return (
        <Box marginTop="100px">
            {isLoading === true ? <Spinner thickness='4px'
                                            speed='0.85s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                            position="absolute"
                                            right="800px"
            ></Spinner> :
            <Card
                width='100%'
            >
                <Flex>
                    <Icon fontSize='24px' marginRight='10px' as={MdAccountCircle}></Icon>
                    <Text
                        color={textColor}
                        fontSize='24px'
                        fontWeight='700'
                        lineHeight='100%'>
                        Thông tin user
                    </Text>
                    <Button type='primary' style={{marginLeft: '20px'}} onClick={onEditProfile}>Chỉnh sửa</Button>
                    <EditUserForm
                        isOpen={isOpen}
                        onCancel={onCancel}
                        userInfo={currentUser}
                    >

                    </EditUserForm>
                </Flex>

                <Box marginLeft='50px' marginTop='50px'>
                    <Text color='secondaryGray.700' fontSize='18px' lineHeight='100%'>Họ tên: {currentUser.name}</Text>
                    <HSeparator width='50%' margin='30px 0'></HSeparator>
                    <Text color='secondaryGray.700' fontSize='18px' lineHeight='100%'>Email: {currentUser.email}</Text>
                    <HSeparator width='50%' margin='30px 0'></HSeparator>
                    <Text color='secondaryGray.700' fontSize='18px' lineHeight='100%'>Số điện thoại: {currentUser.phone}</Text>
                    <HSeparator width='50%' margin='30px 0'></HSeparator>
                    <Text color='secondaryGray.700' fontSize='18px' lineHeight='100%'>Ngày sinh: {moment(currentUser.dob).format('DD/MM/YYYY')}</Text>
                    <HSeparator width='50%' margin='30px 0'></HSeparator>
                </Box>

            </Card>
            }

        </Box>
    );
};

export default UserDetails;