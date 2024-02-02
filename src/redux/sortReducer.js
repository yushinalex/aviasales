import { SORTING } from './types';

const initialState = { option: 'cheapest' };

export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORTING:
      return {
        ...state,
        option: action.payload,
      };

    default:
      return state;
  }
};
