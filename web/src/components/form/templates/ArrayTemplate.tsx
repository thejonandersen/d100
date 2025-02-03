import React, {useState} from "react";
import {z} from "zod";
import {Box, Button, capitalize, Collapse, IconButton, IconButtonProps, InputLabel, BoxProps} from "@mui/material";
import {RenderTemplate} from "./RenderTemplate";
import {resolveSchema} from "../utils";
import {ArrayItemProps, ArrayTemplateProps} from "./types";
import IconResolver from "../../IconResolver";
import {getValue, updateFormData} from '../../../state/form/slice'
import {useAppDispatch, useAppSelector} from '../../../state/hooks'
import {styled} from '@mui/material/styles'
import {cloneDeep} from 'lodash'
import {singularize} from '../../../common/utils';


// Ensure the inner schema is correctly typed
const getInnerSchema = (schema: z.ZodArray<any>): z.ZodTypeAny => {
    return schema.element;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    padding: 0,
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const getLabel = (name: string): string => {
    const secondSplit = name.split('[')[0];
    return secondSplit ? singularize(secondSplit):singularize(name);
}

// Array Item
const ArrayItem: React.FC<ArrayItemProps> = ({schema, name, gridSize, formId, index, remove, displayText}) => {
    const resolvedSchema = resolveSchema(schema);
    const itemName = name ? name.split('.').pop() : name;
    const displayName: string = name ? getLabel(itemName as string) : "";
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (<Box sx={{
        p: 2, border: "1px solid rgba(0,0,0,0.3)", borderRadius: "4px", minWidth: "100%"
    }}>
        <Box
            sx={{ display: "flex", justifyContent: "space-between", pb: expanded ? 1: 0 }}
            onClick={handleExpandClick}
        >
                <InputLabel>{`${capitalize(displayName)}[${index}]`}:</InputLabel>
                <ExpandMore
                    expand={expanded}
                >
                    <IconResolver iconName="ExpandMore" />
                </ExpandMore>
        </Box>
        <Collapse in={expanded}>
            <Box sx={{mt: '5px'}}>
                <RenderTemplate
                    schema={resolvedSchema}
                    name={itemName}
                    gridSize={gridSize}
                    formId={formId}
                    displayText={displayText}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <IconButton sx={{p: 0}} onClick={() => remove(index)}>
                    <IconResolver iconName="Delete" color="error"/>
                </IconButton>
            </Box>
        </Collapse>
    </Box>);
};

// Array Template
export const ArrayTemplate: React.FC<ArrayTemplateProps> = ({schema, name, gridSize, formId, shouldLabelObjects, displayText}) => {
    const innerSchema = resolveSchema(getInnerSchema(schema)) as any;
    const path = `${formId}.${name}`;
    const values = useAppSelector((state) => getValue(state, path));
    const dispatch = useAppDispatch();
    const displayName: string = name ? singularize(name.split(".").pop() as string) : "";
    const handleAdd = (e: any) => {
        if (values?.length) {
            dispatch(updateFormData({id: formId, path: `${path}[${[values.length]}]`, data: {}}));
        } else {
            dispatch(updateFormData({id: formId, path, data: [{}]}));
        }

    }
    const handleRemove = (i: number) => {
        const intermediate = cloneDeep(values);
        intermediate.splice(i, 1);
        console.log(intermediate.length);
        dispatch(updateFormData({id: formId, path, data: intermediate}))
    }
    if (innerSchema.description) {
        try {
            const template = JSON.parse(innerSchema.description).template;
            if (template) return (<RenderTemplate
                schema={innerSchema}
                name={name}
                gridSize={gridSize}
                formId={formId}
                shouldLabelObjects={shouldLabelObjects}
                displayText={displayText}
            />);
        } catch (e) {
            console.error(e);
        }
    }

    return (<>
        {values && values.map((_: any, index: number) => {
            return (<ArrayItem
                schema={innerSchema}
                name={`${name}[${index}]`}
                gridSize={gridSize}
                formId={formId}
                shouldLabelObjects={shouldLabelObjects}
                key={`${name}[${index}]`}
                index={index}
                remove={handleRemove}
                displayText={displayText}
            />);
        })}
        <Button
            onClick={handleAdd}
            variant="contained"
            color="success"
            startIcon={<IconResolver iconName="Add"/>}
        >
            Add {capitalize(displayName)}
        </Button>
    </>);
};
