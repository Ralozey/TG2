
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeList} from "./styles/themes";
import {GlobalStyles} from "./styles";
import {Home} from "./components/Home";
import { Play } from "./components/Play";
import {Admin} from "./components/Admin";

const routes: Array<IRoute> = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/play",
        exact: true,
        component: Play
    },
    {
        path: "/admin",
        exact: true,
        component: Admin
    }
];

export const App: React.FunctionComponent = () => {
    const [theme, setTheme] = useState<number>(Number(localStorage.getItem("theme")) || 0);
    return(
        <BrowserRouter>
            <ThemeProvider theme={ThemeList[theme]}>
                <GlobalStyles />
                <Switch>
                    {routes.map(route => 
                        <Route key={route.path} path={route.path} exact={route.exact}>
                            <route.component setTheme={(val: number) => {
                                setTheme(val);
                                localStorage.setItem("theme", val.toString());
                            }}></route.component>
                        </Route>)}
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export interface IRoute {
    path: string,
    exact?: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any
}

export interface GeneralProps {
    setTheme: (themeId: number) => void,
    className?: string
}