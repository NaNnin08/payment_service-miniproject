import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function MainLayout() {
  return (
    <div className="bg-gray-200">
      <Helmet>
        <title>Payment</title>
        <link rel="shortcut icon" href={""} />
      </Helmet>
      <div className="grid grid-rows-layout grid-cols-1 h-100v">
        <header className="row-span-1 bg-black text-white flex items-center">
          <h1 className="">Navbar</h1>
        </header>
        <main className="row-span-1">
          <h1 className="">Mainlayout</h1>
        </main>
        <footer className="row-span-1 bg-black text-white flex items-center">
          footer
        </footer>
      </div>
    </div>
  );
}
