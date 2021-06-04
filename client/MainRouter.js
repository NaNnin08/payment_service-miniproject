import React from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import icon from "./assets/images/B_icon.svg";
import SuccessAlert from "./components/layout/SuccessAlert";
import Landing from "./views/Landing";
import LinkBankAndCardScreen from "./views/LinkBankAndCardScreen";
import LinkBankScreen from "./views/LinkBankScreen";
import LinkCardScreen from "./views/LinkCardScreen";
import MainLayout from "./views/MainLayout";
import SummaryScreen from "./views/SummaryScreen";
import DetailRegisterScreen from "./views/users/DetailRegisterScreen";
import LoginScreen from "./views/users/LoginScreen";
import RegisterScreen from "./views/users/RegisterScreen";
import WalletScreen from "./views/WalletScreen";
import TopUpBalanceScreen from "./views/TopUpBalanceScreen";

const MainRouter = () => {
  return (
    <>
      <Helmet>
        <title>Bayar</title>
        <link rel="shortcut icon" href={icon} />
      </Helmet>
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
        <Route
          exact
          path="/myaccount/money/card/new"
          component={LinkCardScreen}
        />
        <Route
          exact
          path="/myaccount/money/account/new"
          component={LinkBankAndCardScreen}
        />
        <Route
          exact
          path="/myaccount/topup/balance"
          component={TopUpBalanceScreen}
        />
        <Route exact path="/:action/:type/success" component={SuccessAlert} />
        <MainLayout>
          <Route exact path="/myaccount/summary" component={SummaryScreen} />
          <Route exact path="/myaccount/money" component={WalletScreen} />
        </MainLayout>
      </Switch>
    </>
  );
};

export default MainRouter;
