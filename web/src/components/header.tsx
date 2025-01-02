import React from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

export const Header: React.FunctionComponent = () => {
    return (<Box>
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    d100
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>);
};