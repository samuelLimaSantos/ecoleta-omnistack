import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreatePoint from "./pages/Create-point";
import Home from "./pages/Home";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create-point" component={CreatePoint} />
        <Route component={() => <h1>Error 404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
