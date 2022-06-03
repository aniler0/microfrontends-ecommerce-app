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
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { ProductsType } from "../types/productsType";

interface PopoverMenuProps {
  header: string;
  data: ProductsType[] | undefined;
  icon?: JSX.Element;
  type: "favorites" | "cart";
}

const PopoverMenu = ({ header, data, icon, type }: PopoverMenuProps) => {
 
  let popoverMenuArray: ProductsType[] | undefined =
    type === "favorites" ? data?.filter((item) => item.isFavorite) : data;
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="button" colorScheme="whiteAlpha" icon={icon} />
      </PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">{header}</PopoverHeader>
        <PopoverBody>
          {popoverMenuArray !== undefined && popoverMenuArray.length !== 0
            ? popoverMenuArray?.map((product, key) => (
                <Center key={key} p="1em">
                  <Flex
                    direction="row"
                    align="center"
                    justify="space-between"
                    w="85%"
                  >
                    <Image w="50px" h="50px" src={product.image} />
                    <Flex align="flex-start" direction="column" w="80%">
                      <Text fontSize="small">{product.title}</Text>
                      <Text fontSize="small" fontWeight="bold">
                        ${product.price}
                      </Text>
                    </Flex>
                  </Flex>
                </Center>
              ))
            : type === "favorites"
            ? "There is no favorite products"
            : "Cart is empty"}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
