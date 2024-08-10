import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignInSide from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import {CustomerHome} from "../pages/customer/CustomerHome";
import {BrowseItems} from "../pages/customer/BrowseItems";
import {AdminHome} from "../pages/admin/AdminHome";
import {Product} from "../pages/admin/Product";
import ProductGrid from "../pages/admin/ProductGrid";
import {AddProduct} from "../pages/admin/AddProduct";
import {AddEmployee} from "../pages/admin/AddEmployee";
import {EmployeeAll} from "../pages/admin/ViewAllEmployee";
import {CustomerViewAll} from "../pages/admin/CustomerViewAll";
import {OrderDetail} from "../pages/admin/OrderDetail";
import {UpdateEmployee} from "../pages/admin/EditEmployee";
import ProductDetail from "../pages/customer/ProductDetail";
import {MyOrders} from "../pages/customer/MyOrders";
import {Cart} from "../pages/customer/Cart";
import {PrivateRoute} from "./PrivateRoute";

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignInSide />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/cus/*"
                    element={
                        <PrivateRoute isAdminRoute={false}>
                            <Routes>
                                <Route path="/" element={<CustomerHome />}>
                                    <Route index element={<BrowseItems />} />
                                    <Route path="browse/:productId" element={<ProductDetail />} />
                                    <Route path="my-orders" element={<MyOrders />} />
                                    <Route path="cart" element={<Cart />} />
                                </Route>
                            </Routes>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/adm/*"
                    element={
                        <PrivateRoute isAdminRoute={true}>
                            <Routes>
                                <Route path="/" element={<AdminHome />}>
                                    <Route index element={<ProductGrid />} />
                                    <Route path="products/:productId" element={<Product />} />
                                    <Route path="addProduct" element={<AddProduct />} />
                                    <Route path="addEmployee" element={<AddEmployee />} />
                                    <Route path="employee" element={<EmployeeAll />} />
                                    <Route path="customer" element={<CustomerViewAll />} />
                                    <Route path="order" element={<OrderDetail />} />
                                    <Route path="empUpdate" element={<UpdateEmployee />} />
                                </Route>
                            </Routes>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};