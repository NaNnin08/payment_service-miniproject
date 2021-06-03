import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Landing from "./views/Landing";
import LinkBankScreen from "./views/LinkBankScreen";
import MainLayout from "./views/MainLayout";
import SummaryScreen from "./views/SummaryScreen";
import DetailRegisterScreen from "./views/users/DetailRegisterScreen";
import LoginScreen from "./views/users/LoginScreen";
import RegisterScreen from "./views/users/RegisterScreen";
import WalletChildScreen from "./views/WalletChildScreen";
import WalletScreen from "./views/WalletScreen";

const MainRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/registerDetail" component={DetailRegisterScreen} />
        <Route
          exact
          path="/myaccount/money/banks/new"
          component={LinkBankScreen}
        />
        <MainLayout>
          <Route exact path="/myaccount/summary" component={SummaryScreen} />
          <Route exact path="/myaccount/money" component={WalletScreen} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
