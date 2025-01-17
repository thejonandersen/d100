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
    InputLabel, Tooltip, Button, CardActions
} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {API} from "../../common/axios";
import {CreateRaceSchema} from "d100-libs";
import z from "zod";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";
import IconResolver from '../../components/IconResolver';
import {useCalculateCost} from './useCalculateCost'

type Race = {id?: string} & z.infer<typeof CreateRaceSchema>

export const CreateOrEditRace = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<Race>();
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();
    const [data, setData] = useState<Race>();
    const {cost, itemizedCost} = useCalculateCost(data);
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
                                    isSubMenu
                                    columns={3}
                                    onChange={handleChange}
                                />
                                <Typography variant="h6" sx={{pt: 1}}>Starting Stats</Typography>
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
                                        isSubMenu
                                        columns={4}
                                        labelObjects
                                        onChange={(d) => handleChange(d, 'stats')}
                                    />
                                </Box>
                                <Box sx={{pt: 1}}>
                                    <Form
                                        schema={bottomFormSchemas}
                                        handler={handler}
                                        api={API}
                                        initialData={initialData?.special}
                                        isSubMenu
                                        onChange={handleChange}
                                    />
                                </Box>
                            </>) : <>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                                <Skeleton/>
                            </>}
                        </CardContent>
                        <CardActions sx={{pb: 1}}>
                            <Button variant="contained">Submit</Button>
                        </CardActions>
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
