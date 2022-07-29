import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { ProductsType } from "./Navbar";
import { useEffect, useState } from "react";
import ProductAdd from "./ProductAdd";

interface PopoverMenuProps {
  header: string;
  data: ProductsType[];
  icon?: JSX.Element;
  type: "favorites" | "cart";
  increaseProduct: (id: number, quantity: number) => void;
  decreaseProduct: (id: number, quantity: number) => void;
}

const PopoverMenu = ({
  header,
  data,
  type,
  increaseProduct,
  decreaseProduct,
}: PopoverMenuProps) => {
  const [cost, setCost] = useState(0);
  const popoverMenuArray: ProductsType[] =
    type === "favorites"
      ? data?.filter((item) => item.isFavorite)
      : data?.filter(
          (item) => item.quantity !== undefined && item.quantity > 0
        );

  useEffect(() => {
    const costCalculator = () => {
      let cost = 0;
      popoverMenuArray.forEach((item) => {
        cost += item.price * (item.quantity !== undefined ? item.quantity : 0);
      });
      setCost(cost);
    };
    costCalculator();
  }, [popoverMenuArray, type]);

  return (
    <Menu>
      <MenuButton
        _focus={{ outline: "none" }}
        as={IconButton}
        aria-label="Options"
        icon={type === "cart" ? <AiOutlineShoppingCart /> : <AiOutlineHeart />}
        variant="outline"
      />
      <MenuList p={4}>
        <MenuGroup fontWeight="bold" title={header} m={0}>
          {popoverMenuArray.length !== 0
            ? popoverMenuArray?.map((product, key) => (
                <Box key={key}>
                  <Center key={key} p="1em" w="100%">
                    <Flex
                      direction="row"
                      align="center"
                      justify="space-between"
                      w="100%"
                    >
                      <Center position="relative">
                        <Image w="50px" h="50px" src={product.image} />
                        {type === "cart" && (
                          <Center
                            left={-3}
                            top={-3}
                            w={5}
                            h={5}
                            bgColor="red.500"
                            borderRadius="1rem"
                            position="absolute"
                          >
                            <Text color="white" fontSize="sm" fontWeight="bold">
                              {product.quantity}
                            </Text>
                          </Center>
                        )}
                      </Center>
                      <Flex align="flex-start" direction="column" w="80%">
                        <Text fontSize="small">{product.title}</Text>
                        <Text fontSize="small" fontWeight="bold">
                          ${product.price}
                        </Text>
                      </Flex>
                      {product.quantity && type === "cart" && (
                        <ProductAdd
                          id={product.id}
                          quantity={product.quantity}
                          increaseProduct={increaseProduct}
                          decreaseProduct={decreaseProduct}
                        />
                      )}
                    </Flex>
                  </Center>
                </Box>
              ))
            : type === "favorites"
            ? "There is no favorite products"
            : "Cart is empty"}
        </MenuGroup>
        {type === "cart" && (
          <MenuGroup
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <Text fontSize="sm" fontWeight="bold">
              Total: ${cost.toFixed(2)}
            </Text>
          </MenuGroup>
        )}
      </MenuList>
    </Menu>
  );
};

export default PopoverMenu;
