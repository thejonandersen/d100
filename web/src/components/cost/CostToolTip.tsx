import React from 'react'
import {Itemization} from '../../hooks/useCalculateCost'
import {Box} from '@mui/material'
import {Typography, Table, TableRow, TableHead, TableBody, TableCell} from '@mui/material'

type CostToolTipProps = {
    items: Itemization;
}


export const CostToolTip: React.FC<CostToolTipProps> = ({items}) => {
    console.log({items})
    return (
        <Box sx={{ borderRadius: 1, backgroundColor: 'white' }}>
            {items && <Table size="small" sx={{ p: 0, m: 0 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(items).map(key => {
                        if (typeof items[key] === 'number') {
                            return (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell align="right">{items[key]}</TableCell>
                                </TableRow>
                            )
                        } else {
                            const {breakdown, total} = items[key];
                            console.log({breakdown})
                            if (breakdown) {
                                return (
                                    Object.keys(breakdown).map((k) => (
                                        <TableRow key={k}>
                                            <TableCell>{key}: {k}</TableCell>
                                            <TableCell align="right">{breakdown[k]}</TableCell>
                                        </TableRow>
                                    ))
                                )
                            } else {
                                return null
                            }
                        }
                    })}
                </TableBody>
            </Table>}
        </Box>
    )
}
