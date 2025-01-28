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
    Zoom
} from "@mui/material";

import {CreateCharacterTemplateSchema} from "d100-libs";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";
import IconResolver from '../../components/IconResolver';
import {useCreateOrEdit} from "../../hooks/useCreateOrEdit";

export const CreateOrEditCharacterTemplate = () => {
    const {id} = useParams();
    const {initialData, shouldRender, cost, itemizedCost, submit, canSubmit} = useCreateOrEdit({id, schema: resolveSchema(CreateCharacterTemplateSchema), key: 'character-template'});
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();

    const resolvedSchema: any = resolveSchema(CreateCharacterTemplateSchema);

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
                        <CardHeader title={`${initialData ? "Edit" : "Create New"} Character Template`}></CardHeader>
                        <CardContent>
                            {shouldRender ? (<>
                                <Form
                                    schema={resolvedSchema}
                                    initialData={initialData}
                                    columns={3}
                                    id="top"
                                />
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
