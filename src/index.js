import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {HashRouter, Route, Switch, Redirect, BrowserRouter} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin"
import SignInCentered from "views/auth/signIn";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import {Provider} from "react-redux";
import store from "./redux/store";


ReactDOM.render(
    <Provider store={store}>
      <ChakraProvider theme={theme} >
        <React.StrictMode>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path={`/`}>
                  <Redirect to='/auth/sign-in'></Redirect>
                </Route>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/auth/sign-in`} component={SignInCentered}></Route>
                <Route path={`/admin`} component={AdminLayout} />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </Provider>,
  document.getElementById("root")
);
