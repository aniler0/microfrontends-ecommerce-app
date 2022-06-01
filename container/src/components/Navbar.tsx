import { Center, Flex, Text } from "@chakra-ui/react";
import { Cart, Heart } from "../Icons";

const Navbar = () => {
  return (
    <Center
      width="100%"
      height="10vh"
      bg="white"
      position="fixed"
      top="0"
      zIndex="99999"
      boxShadow="sm"
    >
      <Center w="100%" h="100%" maxW="1200px" justifyContent="space-between">
        <Text>E-Market</Text>
        <Flex direction="row" align="center" w="80px" justify="space-between">
          <Heart />
          <Cart />
        </Flex>
      </Center>
    </Center>
  );
};

export default Navbar;
