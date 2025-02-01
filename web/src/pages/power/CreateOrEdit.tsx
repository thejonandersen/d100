import React, {useState} from "react";
import {
    Alert, Box,
    Card,
    CardHeader,
    Container, Divider,
    Grid2, InputBase,
    Skeleton,
    Zoom
} from "@mui/material";

import {CreatePowerSchema} from "d100-libs";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";
import {useCreateOrEdit} from "../../hooks/useCreateOrEdit";
import {costCalculator} from './costCalculator'
import {CostDisplay} from '../../components/cost/CostDisplay'
import preSubmitProcess from './preSubmitProcess'
import WithProfiling from '../../components/WithProfiling'
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip'
import {CostToolTip} from '../../components/cost/CostToolTip'
import IconResolver from '../../components/IconResolver'
import {getRequirement} from './utils'

export const CreateOrEditPower = () => {
    const {id} = useParams();
    const resolvedSchema: any = resolveSchema(CreatePowerSchema);
    const {initialData, shouldRender, cost, itemizedCost, submit} = useCreateOrEdit({
        id,
        schema: resolvedSchema,
        key: 'power',
        costCalculator,
        preSubmitProcess,
    });
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();

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
                <Grid2 size={9}>
                    <Card className={"Card-Base"}>
                        <CardHeader title={`${initialData ? "Edit" : "Create New"} Power`}></CardHeader>
                        {shouldRender ? (<WithProfiling id="power_form">
                            <Form
                                schema={resolvedSchema}
                                initialData={initialData}
                                id="power"
                                submit={submit}
                            />
                        </WithProfiling>) : <>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                        </>}

                    </Card>
                </Grid2>
                <Grid2 size={3}>
                    <CostDisplay cost={cost} title="PP/CP Cost" itemization={itemizedCost} />
                    <Card sx={{mt: 2}}>
                        <CardHeader title="Min Skill Score"/>
                        <Box width="100%" sx={{flexDirection: "row", display: "flex", alignItems: 'center'}}>
                            <InputBase
                                sx={{ml: 2, flex: 1, fontSize: 30}}
                                placeholder="0"
                                value={getRequirement(cost)}
                            />
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
