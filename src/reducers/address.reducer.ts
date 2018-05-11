import { GET_ADDRESS, GET_ADDRESS_SUCCESS } from '../constants/address.types';

import { FullAddress } from '../models/generated/fullAddress';

export interface AddressState {
  fetching: boolean;
  address?: FullAddress;
}

const initialState: AddressState = {
  fetching: false
};

export function addressReducer (state: AddressState = initialState, action: any): AddressState {
  switch (action.type) {
    case GET_ADDRESS: {
      
      return {
        ...state,
        fetching: true
      };
    }
    
    case GET_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: action.payload.data,
        fetching: false
      };
    }
    
    default:
      return { ...state };
  }
}
