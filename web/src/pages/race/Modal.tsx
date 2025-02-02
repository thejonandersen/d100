import React, {useEffect} from 'react'
import type {Race} from './utils';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Modal, Skeleton,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import IconResolver from '../../components/IconResolver'
import Typography from '@mui/material/Typography'
import {useAppSelector, useAppDispatch} from '../../state/hooks'
import {Language, load as loadLanguages} from '../../state/language/slice'
import {Advantage, load as loadAdvantages} from '../../state/advantage/slice'
import {StatName, StatSchema} from 'd100-libs'
import z from 'zod';

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

type Stat = z.infer<typeof StatSchema>

type StatName = z.infer<typeof StatName>

const StyledTableCell = styled(TableCell)(({ theme }) => (
        {
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
                paddingTop: 1,
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
    const [shouldRender, setShouldRender] = React.useState(false);
    const [startingLanguages, setStartingLanguages] = React.useState<string>();
    const [startingAdvantages, setStartingAdvantages] = React.useState<string>();
    const advantages: Advantage[] = useAppSelector(state => state.advantage.advantages);
    const languages: Language[] = useAppSelector(state => state.language.languages);
    const dispatch = useAppDispatch();
    let rowData: RaceStat[] = [];

    useEffect(() => {
        if (!advantages.length && race) {
            dispatch(loadAdvantages());
        }

        if (!languages.length && race) {
            dispatch(loadLanguages())
        }

        if (languages.length && advantages.length && race) {
            const {languageIds, advantageIds} = race;
            let data: string[];
            data = languageIds?.map(id => {
                const language: Language = languages.find(item => item.id === id) as Language
                return language.name as string;
            }) || [''];
            setStartingLanguages(data.join(', '));
            data = advantageIds?.map(id => {
                const advantage: Language = advantages.find(item => item.id === id) as Advantage
                return advantage.name as string;
            }) || [''];
            setStartingAdvantages(data.join(', '));
            setShouldRender(true);
        }
    }, [advantages, languages, race]);
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
                <CardContent sx={{ width: '100%', flexGrow: 1 }}>
                    {shouldRender && (
                        <>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Type:</Typography>
                                <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                                    {race?.type}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', whiteSpace: 'pre' }}>Languages:</Typography>
                                <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                                    {startingLanguages}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Move:</Typography>
                                <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                                    {race?.move ? race.move : 6}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'nowrap', pb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', whiteSpace: 'pre' }}>Advantages:</Typography>
                                <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                                    {startingAdvantages}
                                </Typography>
                            </Box>
                            <Box sx={{backgroundColor: 'black', color: 'white', pl: 2, pt: 2}}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Starting Stats</Typography>
                            </Box>
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
                                        const stat = race?.stats ? race?.stats[key as keyof StatName] : {} as Stat;
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
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pt: 2 }}>Cost: {race?.cost}</Typography>
                        </>
                    )}
                    {!shouldRender && (
                        <Box>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton width={400} />
                            <Skeleton variant="rectangular" height={200} />
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Modal>
    )
}
