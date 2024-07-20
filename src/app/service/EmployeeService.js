import httpService from "./HttpService";

class EmployeeService {

    save = (formData) => {
        return httpService.post("admin/save", {
            headers: {
                'require-token': 'true',
            },
        }, formData);
    }

    getAllEmployee = () => {
        return httpService.get("admin/getAll", {
            headers: {
                'require-token': 'true'
            },
        });
    }

    update = (formData) => {
        return httpService.post("admin/update-admin", {
            headers: {
                'require-token': 'true',
            },
        }, formData);
    }
}

const employeeService = new EmployeeService();
export default employeeService;