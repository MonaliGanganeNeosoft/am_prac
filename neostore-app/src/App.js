import React from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import PageNotfound from "./Components/PageNotfound";
import Cart from "./Components/Cart";

const Dashboard = lazy(() => import("./Components/Dashboard"));
const Navbars = lazy(() => import("./Components/Navbars"));
const Register = lazy(() => import("./Components/Register"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div style={{ width: "600px", margin: "30px auto" }}>
            <img
              width="600px"
              height="600px"
              src="https://c.tenor.com/qzuj7-PoJTcAAAAM/loading.gif"
            />
          </div>
        }
      >
        <Navbars />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotfound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
