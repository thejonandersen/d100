import React, {useEffect, useState} from "react";
import {Alert, Card, CardHeader, Container, Skeleton, Zoom} from "@mui/material";
import {SubmitHandler} from "react-hook-form";
import {API} from "../../common/axios";
import {CreateRaceSchema, StatBlockSchema} from "d100-libs";
import z from "zod";
import {Form} from "../../components/form";
import {useParams} from "react-router";
import {resolveSchema} from "../../components/form/utils";

type Race = z.infer<typeof CreateRaceSchema>

type RaceSubFormSchemas = {
    name: z.ZodString;
    type: z.ZodString;
    stats: z.infer<typeof StatBlockSchema>;
    advantagesIds: z.ZodArray<z.ZodString>;
    languageIds: z.ZodArray<z.ZodString>;
    move: z.ZodNumber;
    special: z.ZodTypeAny;
}

export const CreateOrEditRace = () => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<Race>();
    const [message, setMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<any>();
    const {id} = useParams();
    const resolvedSchema: any = resolveSchema(CreateRaceSchema);
    // const schemas: RaceSubFormSchemas = {
    //
    //
    //
    //
    // };
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

    const handleChange = (data: any) => {
        console.log(data);
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

    useEffect(() => {
        if (initialData) {
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
            <Card className={"Card-Base"}>
                <CardHeader title={`${initialData ? "Edit" : "Create New"} Race`}></CardHeader>
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
                            advantageIds: initialData?.advantageIds,
                        }}
                        debug
                        isSubMenu
                        columns={3}
                        onChange={handleChange}
                    />
                    <Form
                        schema={stats}
                        handler={handler}
                        initialData={initialData?.stats}
                        debug
                        isSubMenu
                        columns={4}
                        labelObjects
                        onChange={handleChange}
                    />
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

            </Card>
            <Zoom in={!!severity}>
                <Alert severity={severity} sx={{mt: 5}}>{message}</Alert>
            </Zoom>
        </Container>
    );
};
