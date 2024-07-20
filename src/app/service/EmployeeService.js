import httpService from "./HttpService";

class EmployeeService {

    save = (formData) => {
        return httpService.post("admin/save", formData, {
            headers: {
                'require-token': 'true',
            },
        });
    }

    getAllEmployee = () => {
        return httpService.get("admin/getAll", {
            headers: {
                'require-token': 'true'
            },
        });
    }

    update = (formData) => {
        return httpService.post("admin/update", formData, {
            headers: {
                'require-token': 'true',
            },
        });
    }
}

const employeeService = new EmployeeService();
export default employeeService;