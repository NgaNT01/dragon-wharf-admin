import React, {useState} from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {findUser, getListUsers} from "../../../redux/authSlice";
import {findReports, getListReports} from "../../../redux/reportsSlice";
export function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [inputSearch,setInputSearch] = useState('');
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
      console.log(e.target.value === '');
      if (e.target.value === '') {
          dispatch(getListUsers())
          dispatch(getListReports())
      }
      else {
          dispatch(findUser(e.target.value))
          dispatch(findReports(e.target.value))
      }
      setInputSearch(e.target.value);
  }

  return (
    <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      />
      <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "T??m ki???m..."}
        value={inputSearch}
        onChange={handleChangeInput}
      />
    </InputGroup>
  );
}
