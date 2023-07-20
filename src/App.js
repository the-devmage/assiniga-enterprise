import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import UserCartContext from "./context/Cart/CartContext";
import ProductContext from "./context/ProductContext";
import UserContext from "./context/user/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";
import AppLayout from "./ui/AppLayout";
import Welcome from "./pages/Welcome";
import Users from "./pages/Users";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Print from "./components/Print";

function App() {
  return (
    <AuthContext>
      <UserContext>
        <UserCartContext>
          <ProductContext>
            <BrowserRouter>
              <Routes>
                <Route index element={<Welcome />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Homepage />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="product" element={<Products />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="invoice" element={<Print />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer
              position="top-center"
              autoClose={600}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              transition={Slide}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ProductContext>
        </UserCartContext>
      </UserContext>
    </AuthContext>
  );
}

export default App;
