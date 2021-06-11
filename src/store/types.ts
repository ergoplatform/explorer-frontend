import { OpenAPI } from 'openapi-types';
import { Struct } from '../utils/fetchStruct';

export type ApiDocsState = Struct<OpenAPI.Document, any>;
