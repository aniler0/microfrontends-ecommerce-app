import { Center, Flex, Text } from "@chakra-ui/react";
import PopoverMenu from "./PopoverMenu";

export interface ProductsType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
  isFavorite: boolean;
}

interface NavbarProps {
  data: ProductsType[];
  decreaseProduct: (id: number, quantity: number) => void;
  increaseProduct: (id: number, quantity: number) => void;
}

const Navbar = ({ data, decreaseProduct, increaseProduct }: NavbarProps) => {
  return (
    <Center
      width="100%"
      height="100px"
      bg="white"
      position="fixed"
      top="0"
      zIndex="99999"
      boxShadow="sm"
    >
      <Center w="80%" h="100%" justifyContent="space-between">
        <Text>E-Market</Text>
        <Flex direction="row" align="center" w="90px" justify="space-between">
          <PopoverMenu
            decreaseProduct={decreaseProduct}
            increaseProduct={increaseProduct}
            type="favorites"
            header="Favorites"
            data={data}
          />
          <PopoverMenu
            decreaseProduct={decreaseProduct}
            increaseProduct={increaseProduct}
            type="cart"
            header="Cart"
            data={data}
          />
        </Flex>
      </Center>
    </Center>
  );
};

export default Navbar;
