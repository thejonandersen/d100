import React from "react";
import {BrowserRouter} from "react-router";
import {Header} from "./components/Header";
import {DrawerNav} from "./components/DrawerNav";
import {Box, CssBaseline} from "@mui/material";
import "./App.css";
import {AppRoutes} from './routes/AppRoutes'

function App() {
    return (
        <div>
            <CssBaseline/>
            <Header/>
            <DrawerNav/>
            <Box className="app-content-box">
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
