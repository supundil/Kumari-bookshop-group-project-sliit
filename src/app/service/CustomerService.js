import httpService from "./HttpService";

class CustomerService {

    register = (registerDto) => {
        return httpService.post("customer/save", registerDto);
    }

}

const customerService = new CustomerService();
export default customerService;