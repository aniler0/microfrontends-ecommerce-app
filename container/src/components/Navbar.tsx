import { Center, Flex, Text } from "@chakra-ui/react";
import { Cart, Heart } from "../Icons";
import { ProductsType } from "../types/productsType";
import PopoverMenu from "./PopoverMenu";

interface NavbarProps {
  data: ProductsType[];
  cart: ProductsType[];
}

const Navbar = ({ data, cart }: NavbarProps) => {
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
          <PopoverMenu
            type="favorites"
            header="Favorites"
            icon={<Heart />}
            data={data}
          />
          <PopoverMenu type="cart" header="Cart" icon={<Cart />} data={cart} />
        </Flex>
      </Center>
    </Center>
  );
};

export default Navbar;
