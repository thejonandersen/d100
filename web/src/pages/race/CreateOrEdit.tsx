import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid2,
    InputBase,
    Skeleton,
    Tooltip,
    Typography,
    Zoom
} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {API} from "../../common/axios";
import {CreateRaceSchema} from "d100-libs";
import z from "zod";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";
import IconResolver from '../../components/IconResolver';
import * as slice from '../../state/race/slice';
import {useAppDispatch, useAppSelector} from '../../state/hooks'
import {useCreateOrEdit} from "./useCreateOrEdit";

export const CreateOrEditRace = () => {
    const {id} = useParams();
    const {initialData, shouldRender, cost, itemizedCost, submit, canSubmit} = useCreateOrEdit(id, resolveSchema(CreateRaceSchema), slice, 'race');
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();
    const dispatch = useAppDispatch();

    const resolvedSchema: any = resolveSchema(CreateRaceSchema);
    const stats = resolvedSchema.shape.stats;

    const topFormSchemas = z.object({
        name: resolvedSchema.shape.name,
        type: resolvedSchema.shape.type,
        move: resolvedSchema.shape.move,
        languageIds: resolvedSchema.shape.languageIds,
        advantageIds: resolvedSchema.shape.advantageIds
    });

    const bottomFormSchemas = z.object({
        special: resolvedSchema.shape.special
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
                                    initialData={{
                                        name: initialData?.name,
                                        type: initialData?.type,
                                        move: initialData?.move,
                                        languageIds: initialData?.languageIds,
                                        advantageIds: initialData?.advantageIds
                                    }}
                                    columns={3}
                                    id="top"
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
                                        initialData={initialData?.stats}
                                        columns={4}
                                        labelObjects
                                        id="middle/stats"
                                    />
                                </Box>
                                <Box sx={{pt: 1}}>
                                    <Form
                                        schema={bottomFormSchemas}
                                        initialData={initialData?.special}
                                        id="bottom/special"
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
                            <Button variant="contained" disabled={!canSubmit} onClick={submit}>Submit</Button>
                        </CardActions>
                    </Card>
                </Grid2>
                <Grid2 size={2}>
                    <Card>
                        <CardHeader title="Cost"/>
                        <Box width="100%" sx={{flexDirection: "row", display: "flex", alignItems: 'center'}}>
                            <InputBase
                                sx={{ml: 1, flex: 1, fontSize: 30}}
                                placeholder="0"
                                value={cost}
                            />
                            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                            <Tooltip
                                title="Each starting language after 1, +3. Every point of MOVE above 6, +10. Every point of MOVE below 6, -10. For every stat point above 20, +3. Every stat point below 20, -3. Each advantage has a cost."
                                arrow>
                                <IconResolver iconName="Help" sx={{flex: 0.5}}/>
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
