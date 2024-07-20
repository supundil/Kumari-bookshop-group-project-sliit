import httpService from "./HttpService";

class OrderService {

    addToCart = (orderDto) => {
        return httpService.post("order-service/add-to-cart", {
            headers: {
                'require-token': 'true',
            },
        }, orderDto);
    }

    getCart = (username) => {
        return httpService.get("order-service/get-cart/"+username, {
            headers: {
                'require-token': 'true',
            },
        });
    }

    decreaseProductQuantity = (detailId) => {
        return httpService.post("order-service/decrease-product-quantity/"+detailId, {
            headers: {
                'require-token': 'true',
            },
        });
    }

    increaseProductQuantity = (detailId) => {
        return httpService.post("order-service/increase-product-quantity/"+detailId, {
            headers: {
                'require-token': 'true',
            },
        });
    }

    placeOrder = (username) => {
        return httpService.post("order-service/place-order/"+username, {
            headers: {
                'require-token': 'true',
            },
        });
    }

    getAllOrders = (username) => {
        return httpService.get("order-service/get-all-orders/"+username, {
            headers: {
                'require-token': 'true',
            },
        });
    }

}

const orderService = new OrderService();
export default orderService;