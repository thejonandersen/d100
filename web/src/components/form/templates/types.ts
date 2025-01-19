import {z, ZodTypeAny} from "zod";
import React from "react";
import {AxiosInstance} from "axios";
import {JSONSchema} from "d100-libs";

export type FormRootProps = {
    schema: z.ZodTypeAny;
    initialData?: any;
    columns?: number;
    labelObjects?: boolean;
    id: string;
    submitData?: {
        keys: string[];
        url: string;
        id?: string;
    }
};

type BaseTemplateProps = {
    name?: string;
    props?: any;
    gridWrap?: boolean;
    sx?: any;
    gridSize: number;
    formId: string;
    shouldLabelObjects?: boolean;
}

export type StringTemplateProps = {
    schema: z.ZodString | z.ZodDate | z.ZodEnum<any>
} & BaseTemplateProps;

export type NumberTemplateProps = {
    schema: z.ZodNumber;
} & BaseTemplateProps;

export type UnionTemplateProps = {
    schema: z.ZodUnion<any>;
} & BaseTemplateProps;

export type ObjectTemplateProps = {
    schema: z.ZodObject<any>;
} & BaseTemplateProps;

export type BooleanTemplateProps = {
    schema: z.ZodBoolean;
} & BaseTemplateProps;

export type ArrayTemplateProps = {
    schema: z.ZodArray<any>;
} & BaseTemplateProps;

export type ConditionalTemplateProps = {
    schema: ZodTypeAny;
} & BaseTemplateProps

type DynamicSelectionProps = {
    endpoint: string;
    selectionKey: string;
}

export type AsyncSelectionTemplateProps = BaseTemplateProps & {
    schema: z.ZodString;
    props: DynamicSelectionProps
}

export type ArrayItemProps = ConditionalTemplateProps

export type JSONStringTemplateProps = BaseTemplateProps & {
    schema: typeof JSONSchema;
}

export type Templates = {
    StringTemplate: React.FC<StringTemplateProps>;
    NumberTemplate: React.FC<NumberTemplateProps>;
    UnionTemplate: React.FC<UnionTemplateProps>;
    ObjectTemplate: React.FC<ObjectTemplateProps>;
    BooleanTemplate: React.FC<BooleanTemplateProps>;
    ArrayTemplate: React.FC<ArrayTemplateProps>;
    ConditionalTemplate: React.FC<ConditionalTemplateProps>;
    AsyncSelectionTemplate: React.FC<AsyncSelectionTemplateProps>;
    JSONStringTemplate: React.FC<JSONStringTemplateProps>;
};

export type RenderTemplateProps = {
    schema: z.ZodTypeAny;
} & BaseTemplateProps;
