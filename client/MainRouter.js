import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import MainLayout from "./views/MainLayout";
import SummaryScreen from "./views/SummaryScreen";
import DetailRegisterScreen from "./views/users/DetailRegisterScreen";
import LoginScreen from "./views/users/LoginScreen";
import RegisterScreen from "./views/users/RegisterScreen";
import WalletScreen from "./views/WalletScreen";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/registerDetail" component={DetailRegisterScreen} />
        <MainLayout>
          <Route exact path="/myaccount/summary" component={SummaryScreen} />
          <Route exact path="/myaccount/money" component={WalletScreen} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
