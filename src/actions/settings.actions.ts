import { Action, Dispatch } from 'redux';

import { SET_LOCALE } from '../constants/settings.types';

export const setLocale = (localeId: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      payload: {
        locale: localeId
      },
      type: SET_LOCALE
    });
  };
};
