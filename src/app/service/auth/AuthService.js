import httpService from "../HttpService";

class AuthService {

    login = (loginDto) => {
        return httpService.post("login/user-login", loginDto);
    }

}

const authService = new AuthService();
export default authService;