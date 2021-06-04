import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function MainLayout(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <div className="font-serif bg-gray-100 min-h-screen">
      <div className="grid grid-rows-layout grid-cols-1 h-100v">
        <Navbar />
        <main className="row-span-1 bg-gray-100">{props.children}</main>
        <footer className={"relative bg-blueGray-200 pt-2 pb-2 row-span-1"}>
          <div className="container mx-auto">
            <div className="border-t-2 border-gray-300 flex flex-col items-center">
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
