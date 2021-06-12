import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "./auth/PrivateRoute";
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
import Dummy from "./views/dummy";
import OrderViews from "./views/OrderViews";
import ProfilePageScreen from "./views/users/ProfilePageScreen";
import AddPhotoProfileScreen from "./views/AddPhotoProfileScreen";
import { ErrorAlert } from "./components/layout/ErrorAlert";
import { TransactionScreen } from "./views/TransactionScreen";
import { TransferScreen } from "./views/TransferScreen";
import { TransferWalletInput } from "./views/TransferWalletInput";
import { TransferSendSelect } from "./views/TransferSendSelect";
import { TransferWalletCheckout } from "./views/TransferWalletCheckout";

const MainRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Helmet>
        <title>Bayar</title>
        <link rel="shortcut icon" href={icon} />
      </Helmet>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/dummy" component={Dummy} />
        <PrivateRoute
          exact
          path="/pay/order/wallet/:id"
          component={OrderViews}
        />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/registerDetail" component={DetailRegisterScreen} />
        <PrivateRoute
          exact
          path="/myaccount/money/banks/new"
          component={LinkBankScreen}
        />
        <PrivateRoute
          exact
          path="/myaccount/money/card/new"
          component={LinkCardScreen}
        />
        <PrivateRoute
          exact
          path="/myaccount/money/account/new"
          component={LinkBankAndCardScreen}
        />
        <PrivateRoute
          exact
          path="/myaccount/topup/balance"
          component={TopUpBalanceScreen}
        />
        <PrivateRoute
          exact
          path="/:action/:type/success"
          component={SuccessAlert}
        />
        <PrivateRoute exact path="/:action/:type/fail" component={ErrorAlert} />
        <PrivateRoute
          exact
          path="/myaccount/add/profile"
          component={AddPhotoProfileScreen}
        />
        <MainLayout>
          <PrivateRoute
            exact
            path="/myaccount/summary"
            component={SummaryScreen}
          />
          <PrivateRoute
            exact
            path="/myaccount/money"
            component={WalletScreen}
          />
          <PrivateRoute
            exact
            path="/myaccount/profile"
            component={ProfilePageScreen}
          />
          <PrivateRoute
            exact
            path="/myaccount/transaction"
            component={TransactionScreen}
          />
          <PrivateRoute
            exact
            path="/myaccount/transfer/"
            component={TransferScreen}
          />
          <PrivateRoute
            exact
            path="/myaccount/transfer/input"
            component={TransferWalletInput}
          />
          <PrivateRoute
            exact
            path="/myaccount/transfer/select"
            component={TransferSendSelect}
          />
          <PrivateRoute
            exact
            path="/myaccount/transfer/preview"
            component={TransferWalletCheckout}
          />
        </MainLayout>
      </Switch>
    </AnimatePresence>
  );
};

export default MainRouter;
