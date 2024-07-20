import httpService from "./HttpService";

class ProductService {

    getAllProducts = () => {
        return httpService.get("product/get-all", {
            headers: {
                'require-token': 'true'
            },
        });
    }

}

const productService = new ProductService();
export default productService;