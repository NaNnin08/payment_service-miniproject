import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <MainLayout></MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
