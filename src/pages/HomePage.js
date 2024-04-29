import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Routes } from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import UserList from "./dashboard/UserList";
import ClientList from "./dashboard/ClientList";
import AdsyList from "./dashboard/AdsyList";
import WithdrawRequest from "./dashboard/WithdrawRequest";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar exact path={Routes.UserList.path} component={UserList} />
    <RouteWithSidebar
      exact
      path={Routes.ClientList.path}
      component={ClientList}
    />
    <RouteWithSidebar exact path={Routes.AdsyList.path} component={AdsyList} />
    <RouteWithSidebar
      exact
      path={Routes.WithdrawRequest.path}
      component={WithdrawRequest}
    />
  </Switch>
);
