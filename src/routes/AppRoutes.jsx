import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../component/Layout";
import AboutUs from "../component/About";
import Banner from "../component/Banner";
import OurServices from '../component/OurServices'
import Home from "../component/Home";
import ContactPage from "../component/ContactPage";
import Brand from "../component/Brand";
import Services from "../component/Services";
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
          <Route path="/contact"  element={<ContactPage/> }/>
          <Route path="/brand" element={ <Brand/>} />
         <Route  path="/service" element={<Services/> }   />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
