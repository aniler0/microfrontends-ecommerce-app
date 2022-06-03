import {
  Center,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProductsType } from "../types/productsType";
import ProductCount from "./ProductCount";

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
  icon,
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
    <Popover>
      <PopoverTrigger>
        <IconButton
          isActive={type === "cart"}
          onClick={() => console.log(type)}
          aria-label={type}
          colorScheme="whiteAlpha"
          icon={icon}
        />
      </PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">{header}</PopoverHeader>
        <PopoverBody>
          {popoverMenuArray.length !== 0
            ? popoverMenuArray?.map((product, key) => (
                <Center key={key} p="1em">
                  <Flex
                    direction="row"
                    align="center"
                    justify="space-between"
                    w="85%"
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
                    {product.quantity && (
                      <ProductCount
                        id={product.id}
                        quantity={product.quantity}
                        increaseProduct={increaseProduct}
                        decreaseProduct={decreaseProduct}
                      />
                    )}
                  </Flex>
                </Center>
              ))
            : type === "favorites"
            ? "There is no favorite products"
            : "Cart is empty"}
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          {type === "cart" && (
            <Text fontSize="sm" fontWeight="bold">
              Total: ${cost}
            </Text>
          )}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
