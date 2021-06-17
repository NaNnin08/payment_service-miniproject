import React from "react";
import Navbar from "../components/layout/Navbar";

export default function MainLayout(props) {
  return (
    <div className="font-serif bg-gray-100 min-h-screen">
      <div className="grid grid-rows-layout grid-cols-1 h-100v">
        <Navbar />
        <div className="row-span-1 bg-gray-100">{props.children}</div>
        <footer className={"relative bg-gray-100 pt-2 pb-2 row-span-1"}>
          <div className="mx-auto">
            <div className="border-t-2 border-gray-300 bg-gray-100 flex flex-col items-center">
              <div className="sm:w-2/3 text-center py-4">
                <p className="text-sm  font-thin">
                  © 2021 by Nida Sunandar | Code.id
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
