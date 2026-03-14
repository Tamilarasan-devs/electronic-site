import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="">
      <Header />

      <main className="">
        {/* Nested route content renders here */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
