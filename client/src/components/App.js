import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import MainPage from './views/MainPage';
import ErrorPage from './views/Error';
import Dashboard from './views/Dashboard';
import Inventory from './views/Inventory';
import Administration from './views/Administration';
import Agents from './views/Agents';
import Gallery from './views/Gallery';
import Chat from './views/chat';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/main" component={Auth(MainPage, true)} />
          <Route path="/error/:code" component={Auth(ErrorPage , null)} />
          <Route component={Auth(ErrorPage , null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export const MainRoutes = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/administration" component={Administration} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/chats" component={Chat} />
          <Route exact path="/agents" component={Agents} />
          {/* <Route exact path="/alert" component={Alerts} /> */}
          <Route component={ErrorPage} />
        </Switch>
      </Suspense>
  )
}

export default App;
