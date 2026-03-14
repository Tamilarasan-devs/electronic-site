import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import AboutUs from "../component/About";
import Banner from "../component/Banner";
import OurServices from '../component/OurServices'
import Home from "../component/Home";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          {/* Define nested routes here */}
          <Route path="/" element={<Home/>  } />
          <Route path="/banner" element={ <Banner/> } />
          <Route path="/ourservices" element={ <OurServices/> } />
          <Route path="/about" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
