import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
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
            <HashRouter>
              <Switch>
                <Route exact path={`/`}>
                  <Redirect to='/auth'></Redirect>
                </Route>
                <Route path={`/auth`} component={AuthLayout} />
                <Route path={`/admin`} component={AdminLayout} />
                {/*<Redirect from='/' to='/admin' />*/}
              </Switch>
            </HashRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
    </Provider>,
  document.getElementById("root")
);
