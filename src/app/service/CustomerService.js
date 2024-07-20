import httpService from "./HttpService";

class CustomerService {

    register = (registerDto) => {
        return httpService.post("customer/save", registerDto);
    }

    getAllCustomer = () => {
        return httpService.get("customer/getAll", {
            headers: {
                'require-token': 'true'
            },
        });
    }
}

const customerService = new CustomerService();
export default customerService;