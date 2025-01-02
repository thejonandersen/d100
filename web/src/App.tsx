import React from "react";
import {BrowserRouter} from "react-router";
import {Header} from "./components/header";
import {Box, CssBaseline} from "@mui/material";
import "./App.css";
import {AppRoutes} from './common/AppRoutes'

function App() {
    return (
        <div>
            <CssBaseline/>
            <Header/>
            <Box className="app-content-box">
                <BrowserRouter>
                    <AppRoutes/>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
