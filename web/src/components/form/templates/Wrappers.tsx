import React from "react";
import {Box, Grid2, SxProps, Typography} from "@mui/material";

export const GridWrap: React.FC<{ children: React.ReactElement, gridWrap: boolean, gridSize: number }> = ({
    children, gridWrap, gridSize
}) => {
    return (<>
        {gridWrap ? (<Grid2 size={{sm: 12, xs: 12, md: gridSize, lg: gridSize, xl: gridSize}}>
            {children}
        </Grid2>) : (<>{children}</>)}
    </>);
};

export const StyleWrap: React.FC<{ children: React.ReactElement, sx: any }> = ({children, sx}) => {
    return (<>
        {sx ? (<Box sx={sx}>
            {children}
        </Box>) : (<>{children}</>)}
    </>);
};

export const LabeledObject: React.FC<{
    children: React.ReactElement, label: string, shouldLabelObjects: boolean | undefined, sx?: SxProps
}> = ({children, label, shouldLabelObjects, sx={}}) => {
    return (<>
        {shouldLabelObjects ? (<Box sx={sx}>
            <Typography sx={{mb: 1}}>{label}</Typography>
            {children}
        </Box>) : (<>{children}</>)}
    </>);
};

