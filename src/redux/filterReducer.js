/* eslint-disable default-param-last */
import { TOGGLE } from './types';

const initialState = { ids: [2] };

export const filterReducer = (state = initialState, action) => {
  const { type, id } = action;
  switch (type) {
    case TOGGLE:
      if (id === 1) {
        if (state.ids.includes(id)) {
          return { ...state, ids: [] };
        }
        return { ...state, ids: [1, 2, 3, 4, 5] };
      }
      if (state.ids.includes(id)) {
        return { ...state, ids: state.ids.filter((el) => el !== id && el !== 1) };
      }
      if (state.ids.length === 3) {
        return { ...state, ids: [1, 2, 3, 4, 5] };
      }
      return { ...state, ids: [...state.ids, id] };

    default:
      return state;
  }
};
