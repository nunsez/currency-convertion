import React from "react";
import { Switch, Route } from "react-router-dom";

import Converter from "./Converter";
import Rates from "./Rates";

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Converter} />
            <Route path="/rates" component={Rates} />
        </Switch>
    </main>
);

export default Main;
