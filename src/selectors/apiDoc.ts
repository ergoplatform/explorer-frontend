import { getStruct } from 'redux-struct';
import { GET_OPENAPI_YAML_STRUCT } from '../constants/struct.types';

export const apiDocStructSelector = (state: any) =>
  getStruct(GET_OPENAPI_YAML_STRUCT)(state);
