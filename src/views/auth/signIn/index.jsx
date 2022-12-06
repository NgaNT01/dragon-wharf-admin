import React from "react";
import {useState,useEffect} from "react";
import {useForm} from "react-hook-form";
import { NavLink,Link,useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import benNhaRong from "assets/img/auth/ben_nha_rong.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../../redux/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const handleClick = () => setShow(!show);
  const isLoading = useSelector(state => state.auth.isLoading)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  const onSubmit = async (current) => {
    try {
      console.log("log in");
      const action = signIn(current);
      const result = await dispatch(action);
      const response = unwrapResult(result);
    }
    catch {
      return current
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      history.push('/admin/dashboard');
    }
  });


  return (
    <DefaultAuth illustrationBackground={benNhaRong} >
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='40px' mb='10px'>
            Đăng nhập
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='25px'>
            Nhập email và password của bạn!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='Nhập email'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  {...register('username', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
              />
              <FormLabel
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  display='flex'>
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                    fontSize='sm'
                    placeholder='Nhập password'
                    mb='24px'
                    size='lg'
                    type={show ? "text" : "password"}
                    variant='auth'
                    {...register('password', {
                      required: 'This is required',
                      minLength: { value: 4, message: 'Minimum length should be 4' },
                    })}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <FormControl display='flex' alignItems='center'>
                  <Checkbox
                      id='remember-login'
                      colorScheme='brandScheme'
                      me='10px'
                  />
                  <FormLabel
                      htmlFor='remember-login'
                      mb='0'
                      fontWeight='normal'
                      color={textColor}
                      fontSize='sm'>
                    Nhớ mật khẩu
                  </FormLabel>
                </FormControl>
                <NavLink to='/auth/forgot-password'>
                  <Text
                      color={textColorBrand}
                      fontSize='sm'
                      w='124px'
                      fontWeight='500'>
                    Quên mật khẩu?
                  </Text>
                </NavLink>
              </Flex>
            </FormControl>
            <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                type="submit"
                isLoading={isLoading}
            >
              Đăng nhập
            </Button>
          </form>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Chưa có tài khoản?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Tạo một tài khoản
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
