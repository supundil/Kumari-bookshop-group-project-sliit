import httpService from "./HttpService";

class ProductService {

    save = (formData) => {
        return httpService.post("product/save", formData, {
            headers: {
                'require-token': 'true',
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    getCategories = () => {
        return httpService.get("product/get-all-active-categories", {
            headers: {
                'require-token': 'true'
            },
        });
    }

    getAllProducts = () => {
        return httpService.get("product/get-all", {
            headers: {
                'require-token': 'true'
            },
        });
    }

    getProduct = (productId) => {
        return httpService.get("product/get/"+productId, {
            headers: {
                'require-token': 'true'
            },
        });
    }

    update = (formData) => {
        return httpService.post("product/update", formData, {
            headers: {
                'require-token': 'true',
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    delete = (productId) => {
        return httpService.deleteOne("product/delete-product/"+productId, {
            headers: {
                'require-token': 'true'
            },
        });
    }

}

const productService = new ProductService();
export default productService;