import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import {Login} from "./features/user/login";
import {Header} from "./components/header";
import {Box, CssBaseline} from "@mui/material";
import "./App.css";

function App() {
    return (
        <div>
            <CssBaseline/>
            <Header/>
            <Box className="app-content-box">
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </Box>
        </div>
    );
}

export default App;
