import axios from "axios";
import { ProductProps } from "./Products";

export interface GetProductsResponse {
 response: { resultData: { productList: ProductProps[] } };
}

const getProducts = async () => {
 try {
  const {
   data: {
    response: { resultData },
   },
  } = await axios.get<GetProductsResponse>(process.env.REACT_APP_BASE_API);
  return resultData.productList;
 } catch (error) {
  if (axios.isAxiosError(error)) {
   return error.message;
  } else {
   return "An unexpected error occurred";
  }
 }
};

const productService = {
 getProducts,
};

export default productService;
