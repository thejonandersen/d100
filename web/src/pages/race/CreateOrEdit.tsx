import React, {useEffect, useState} from "react";
import {
    Alert,
    Card,
    CardHeader,
    Container,
    Skeleton,
    Zoom,
    Box,
    Typography,
    CardContent,
    Grid2,
    Paper,
    IconButton,
    Divider,
    InputBase,
    InputLabel, Tooltip
} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {API} from "../../common/axios";
import {CreateRaceSchema, StatBlockSchema, StatSchema, Stat as StatName} from "d100-libs";
import z, {number} from "zod";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";
import IconResolver from '../../components/IconResolver';
import {getTypedProperty} from '../../common/utils'

type Race = z.infer<typeof CreateRaceSchema>
type Stat = z.infer<typeof StatSchema>

type CostItem = {
    total: number,
    breakdown?: {
        [key: string]: number,
    }
}

type Itemization = {
    stats: CostItem,
    move: number,
    languages: number,
    advantages: CostItem,
}



export const CreateOrEditRace = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<Race>();
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();
    const [cost, setCost] = useState(0);
    const [data, setData] = useState<Race>();
    const [itemizedCost, setItemizedCost] = useState<Itemization>({
        stats: {
            total: 0,
        },
        move: 0,
        languages: 0,
        advantages: {
            total: 0
        }
    });
    const {id} = useParams();
    const resolvedSchema: any = resolveSchema(CreateRaceSchema);
    const stats = resolvedSchema.shape.stats;

    const topFormSchemas = z.object({
        name: resolvedSchema.shape.name,
        type: resolvedSchema.shape.type,
        move: resolvedSchema.shape.move,
        languageIds: resolvedSchema.shape.languageIds,
        advantageIds: resolvedSchema.shape.advantageIds,
    });

    const middleFormSchema = z.object({
        stats: resolvedSchema.shape.stats,
    })

    const bottomFormSchemas = z.object({
        special: resolvedSchema.shape.special,
    });

    const clearMessages = (e: React.FocusEvent<HTMLInputElement>) => {
        setSeverity("");
        setMessage(null);
    };

    const openMessages = (text: string, style: string) => {
        setMessage(text);
        setSeverity(style);

        setTimeout(clearMessages, 2000);
    };

    const handleChange = (payload: any, key: string | null = null) => {
        const change = key ? { [key]: payload } : payload;

        setData({
            ...initialData,
            ...data,
            ...change,
        })
    };

    const handler: SubmitHandler<Race> = async (data: Race) => {
        try {
            delete data.id;
            const response = await API.post(`race${id ? `/${id}` : ""}`, data);
            openMessages(`Race ${id ? "updated" : "created"}: ${data.name}`, "success");
        } catch (e: any) {
            openMessages(e.message, "error");
        }
    };

    const loadRace = async () => {
        try {
            const response = await API.get(`race/${id}`);
            setInitialData(response);
        } catch (e) {

        }
    };

    const calculateAndItemizeCosts = (data: Race) => {
        let runningTotal = 0;
        let itemized = {...itemizedCost};
        const {advantageIds, languageIds, move, stats} = data;

        if (languageIds && languageIds.length ) {
            const diff = (languageIds.length - 1) * 3;
            itemized.languages = diff;
            runningTotal += diff;
        }

        if (move) {
            const diff = (move - 6) * 10
            itemized.move = diff;
            runningTotal += diff;
        }

        if (stats) {
            let diff = 0;
            itemized.stats = stats ? Object.keys(stats).reduce((pre: any, cur: string) => {
                const item: Stat = getTypedProperty(stats, cur as NonNullable<StatName>);
                if (item.max !== 20) {
                    diff = (item.max - 20) * 3;
                    pre.total += diff;
                    pre.breakdown[cur] = diff;
                }

                runningTotal += diff;

                return pre;
            }, { total: 0, breakdown: {} }) : { total: 0 }
        }


        setItemizedCost(itemized);
        setCost(runningTotal);
    }

    useEffect(() => {
        if (!data)
            return
        calculateAndItemizeCosts(data);

        console.log({data})
    }, [data]);

    useEffect(() => {
        if (initialData && !shouldRender) {
            setShouldRender(true);
        }
    }, [initialData]);

    useEffect(() => {
        if (!id) {
            setShouldRender(true);
            return;
        }

        loadRace();
    }, [id]);

    return (
        <Container maxWidth="md">
            <Grid2 container spacing={3}>
                <Grid2 size={10}>
                    <Card>
                        <CardHeader title={`${initialData ? "Edit" : "Create New"} Race`}></CardHeader>
                        <CardContent>
                            {shouldRender ? (<>
                                <Form
                                    schema={topFormSchemas}
                                    handler={handler}
                                    api={API}
                                    initialData={{
                                        name: initialData?.name,
                                        type: initialData?.type,
                                        move: initialData?.move,
                                        languageIds: initialData?.languageIds,
                                        advantageIds: initialData?.advantageIds
                                    }}
                                    debug
                                    isSubMenu
                                    columns={3}
                                    onChange={handleChange}
                                />
                                <Typography variant="h6">Starting Stats</Typography>
                                <Box sx={{
                                    p: 2,
                                    border: "1px solid rgba(0, 0, 0, 0.25)",
                                    my: 1,
                                    borderRadius: 1
                                }}>

                                    <Form
                                        schema={stats}
                                        handler={handler}
                                        initialData={initialData?.stats}
                                        debug
                                        isSubMenu
                                        columns={4}
                                        labelObjects
                                        onChange={(d) => handleChange(d, 'stats')}
                                    />
                                </Box>
                                <Form
                                    schema={bottomFormSchemas}
                                    handler={handler}
                                    api={API}
                                    initialData={initialData?.special}
                                    debug
                                    isSubMenu
                                    onChange={handleChange}
                                />
                            </>) : <>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                            </>}
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={2}>
                    <Card>
                        <CardHeader title="Cost" />
                        <Box width="100%" sx={{flexDirection: "row", display: "flex", alignItems: 'center'}}>
                            <InputBase
                                sx={{ ml: 1, flex: 1, fontSize: 30 }}
                                placeholder="0"
                                value={cost}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <Tooltip title="Each starting language after 1, +3. Every point of MOVE above 6, +10. Every point of MOVE below 6, -10. For every stat point above 20, +3. Every stat point below 20, -3. Each advantage has a cost." arrow>
                                <IconResolver iconName="Help" sx={{flex: 0.5}} />
                            </Tooltip>
                        </Box>
                    </Card>
                </Grid2>
            </Grid2>
            <Zoom in={!!severity}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    );
};
