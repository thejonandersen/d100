import {Templates} from './types'
import {StringTemplate} from './StringTemplate'
import {NumberTemplate} from './NumberTemplate'
import {UnionTemplate} from './UnionTemplate'
import {BooleanTemplate} from './BooleanTemplate'
import {ObjectTemplate} from './ObjectTemplate'
import {ArrayTemplate} from './ArrayTemplate'
import {ConditionalTemplate} from './ConditionalTemplate'
import {AsyncSelectionTemplate} from './AsyncSelectionTemplate'
import {JSONStringTemplate} from './JSONStringTemplate'
export {Form} from './Form';

export * from './RenderTemplate'
export * from './types'

export const BaseTemplates: Templates = {
    StringTemplate,
    NumberTemplate,
    UnionTemplate,
    ObjectTemplate,
    BooleanTemplate,
    ArrayTemplate,
    ConditionalTemplate,
    AsyncSelectionTemplate,
    JSONStringTemplate
};
