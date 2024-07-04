import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInSide from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import {CustomerHome} from "../pages/customer/CustomerHome";
import {BrowseItems} from "../pages/customer/BrowseItems";
import {AdminHome} from "../pages/admin/AdminHome";
import {Products} from "../pages/admin/Products";

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignInSide/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/cus/" element={<CustomerHome/>}>
                    <Route index element={<BrowseItems/>}/>
                    {/*<Route path="profile" element={<Profile/>}/>*/}
                    {/*<Route path="leaderboard" element={<Leaderboard/>}/>*/}
                </Route>
                <Route path="/adm/" element={<AdminHome/>}>
                    <Route index element={<Products/>}/>
                    {/*<Route path="profile" element={<Profile/>}/>*/}
                    {/*<Route path="leaderboard" element={<Leaderboard/>}/>*/}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};