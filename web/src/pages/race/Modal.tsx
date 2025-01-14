import React from 'react'
import type {Race} from './utils';
import {Card, CardContent, CardHeader, Modal, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import IconResolver from '../../components/IconResolver'
import Typography from '@mui/material/Typography'

type RaceModalParams = {
    race: Race | null;
    handleClose: () => void;
}

type RaceStat = {
    name: string;
    data: {
        min: number;
        max: number;
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => (
        {
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
            },
        }
));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Row: React.FC<{stats: RaceStat[]}> = ({stats}) => {
    return (<StyledTableRow key={`row_${Math.random()*10}_${Math.random()*10}`}>
        {stats.map((stat, index) => {
                if (index%2 === 0)
                    return (
                        <>
                            <StyledTableCell align="center">{stat.name}</StyledTableCell>
                            <StyledTableCell align="center">{stat.data.min}</StyledTableCell>
                            <StyledTableCell align="center">{stat.data.max}</StyledTableCell>
                            <StyledTableCell align="center">|</StyledTableCell>
                        </>
                    )

                return (
                    <>
                        <StyledTableCell align="center">{stat.name}</StyledTableCell>
                        <StyledTableCell align="center">{stat.data.min}</StyledTableCell>
                        <StyledTableCell align="center">{stat.data.max}</StyledTableCell>
                    </>
                )
            }
        )}
    </StyledTableRow>)
}

export const RaceModal: React.FC<RaceModalParams> = ({ race, handleClose}) => {
    let rowData: RaceStat[] = [];
    return (
        <Modal
            open={!!race}
            onClose={() => handleClose()}
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
            }}
        >
            <Card sx={{maxWidth: 500}}>
                <CardHeader
                    title={race?.name}
                    titleTypographyProps={{
                        color: 'primary',
                        variant: 'h5'
                    }}
                    action={
                        <IconButton onClick={() => handleClose()}>
                            <IconResolver iconName="Close" />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Type:</Typography>
                    <Typography variant="body2" sx={{ pb: 2 }}>
                        {race?.type}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Stats:</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Min</StyledTableCell>
                                <StyledTableCell>Max</StyledTableCell>
                                <StyledTableCell>|</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Min</StyledTableCell>
                                <StyledTableCell>Max</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {race?.stats !== null ? Object.keys(race?.stats || {}).map((key, index) => {
                                console.log({key, even: index%2 !== 0})
                                // @ts-ignore
                                const stat = race?.stats[key] || {};
                                if (index%2 === 0 && index !== 6) {
                                    rowData = []
                                    rowData.push({
                                        name: key,
                                        data: stat,
                                    })
                                    return null
                                } else if (index !== 6) {
                                    rowData.push({
                                        name: key,
                                        data: stat,
                                    })
                                    return (<Row stats={rowData} />)
                                } else {
                                    rowData = []
                                    rowData.push({
                                        name: key,
                                        data: stat,
                                    })
                                    return (<Row stats={rowData} />)
                                }



                            }): null}
                        </TableBody>
                    </Table>

                    {/*<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{`Requirements${special && special.requirements ? ` (${specialReqsToString(special.requirements)})`:''}:`}</Typography>*/}
                    {/*{selected?.requirements.map((req) => {*/}
                    {/*    return (*/}
                    {/*        <Typography>{reqToString(req)}</Typography>*/}
                    {/*    )*/}
                    {/*})}*/}
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pt: 2 }}>Cost: {race?.cost}</Typography>
                </CardContent>
            </Card>
        </Modal>
    )
}
