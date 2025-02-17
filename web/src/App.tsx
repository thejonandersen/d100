import React from "react";
import {BrowserRouter} from "react-router";
import {Header} from "./components/Header";
import {DrawerNav} from "./components/DrawerNav";
import {Box, CssBaseline} from "@mui/material";
import "./App.css";
import {AppRoutes} from './routes/AppRoutes'


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <AppRoutes/>
        </BrowserRouter>
    );
}

export default App;
