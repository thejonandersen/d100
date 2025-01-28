import React from "react";
import {Box, Card, CardHeader, Divider, InputBase} from '@mui/material'
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import IconResolver from '../IconResolver'
import {Itemization} from '../../hooks/useCalculateCost'
import {CostToolTip} from './CostToolTip'

type CostDisplayProps = {
    cost: number,
    title: string,
    itemization: Itemization,
}

export const CostDisplay: React.FC<CostDisplayProps> = ({cost, itemization, title}) => {
    return (
        <Card>
            <CardHeader title={title}/>
            <Box width="100%" sx={{flexDirection: "row", display: "flex", alignItems: 'center'}}>
                <InputBase
                    sx={{ml: 1, flex: 1, fontSize: 30}}
                    placeholder="0"
                    value={cost}
                />
                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                <Tooltip
                    sx={(theme) => ({
                        [`& .${tooltipClasses.arrow}`]: {
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: theme.shadows[5],
                        },
                        [`& .${tooltipClasses.tooltip}`]: {
                            backgroundColor: theme.palette.background.paper,
                        },
                    })}
                    title={
                        <CostToolTip items={itemization} />
                    }
                    arrow>
                    <IconResolver iconName="Help" sx={{flex: 0.5}}/>
                </Tooltip>
            </Box>
        </Card>
    )
}
