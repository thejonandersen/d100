import {z, ZodTypeAny} from "zod";
import {Control, FieldErrors, UseFieldArrayRemove, UseFieldArrayUpdate} from 'react-hook-form'
import React from 'react'
import {ConditionalTemplate} from './Templates'

export type FormProps = {
  schema: z.ZodObject<any>;
  initialData?: { [key: string]: unknown };
  onSubmit?: (data: { [key: string]: unknown }) => void;
  onError?: (errors: z.ZodIssue[], data?: { [key: string]: unknown }) => void;
  templates?: Templates;
  formRoot?: React.FC<FormRootProps>;
  readonly?: boolean;
};

export type FormRootProps = {
  schema: z.ZodTypeAny;
  onSubmit: (data: any) => any;
};

type BaseTemplateProps = {
  errors: FieldErrors;
  control: Control;
  name?: string;
  parent?: string;
  props?: any;
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

export type ConditionalTemplateProps  = {
  schema: ZodTypeAny;
} & BaseTemplateProps

export type ArrayItemProps = ConditionalTemplateProps & {
  index: number;
  update: UseFieldArrayUpdate<any, any>;
  value: any;
  remove: UseFieldArrayRemove;
}

export type Templates = {
  StringTemplate: React.FC<StringTemplateProps>;
  NumberTemplate: React.FC<NumberTemplateProps>;
  UnionTemplate: React.FC<UnionTemplateProps>;
  ObjectTemplate: React.FC<ObjectTemplateProps>;
  BooleanTemplate: React.FC<BooleanTemplateProps>;
  ArrayTemplate: React.FC<ArrayTemplateProps>;
  ConditionalTemplate: React.FC<ConditionalTemplateProps>;
};

export interface RenderTemplateProps {
  schema: z.ZodTypeAny;
  errors: FieldErrors;
  control: Control;
  name?: string;
  parent?: string;
  props?: any;
}
