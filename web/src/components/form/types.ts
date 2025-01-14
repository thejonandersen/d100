import {z, ZodTypeAny} from "zod";
import {Control, FieldErrors, UseFieldArrayRemove, UseFieldArrayUpdate} from 'react-hook-form'
import React from 'react'
import {AxiosInstance} from 'axios'
import {JSONSchema} from 'd100-libs'
import {JSONStringTemplate} from './Templates'

export type FormRootProps = {
    schema: z.ZodTypeAny;
    handler: (data: any) => any;
    onChange?: (data: any) => any;
    api?: AxiosInstance;
    debug?: boolean;
    initialData?: any;
    isSubMenu?: boolean;
};

type BaseTemplateProps = {
    errors: FieldErrors;
    control: Control;
    name?: string;
    parent?: string;
    props?: any;
    initialData?: any;
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

export type ArrayItemProps = ConditionalTemplateProps & {
    index: number;
    update: UseFieldArrayUpdate<any, any>;
    value: any;
    remove: UseFieldArrayRemove;
}

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
