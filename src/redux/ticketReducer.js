import { GOT_TICKETS, GOT_ERROR, GOT_ALL, GOT_NOTHING } from './types';

const initialState = { tickets: [], loading: true, error: false };

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };

    case GOT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case GOT_ALL:
      return {
        ...state,
        loading: false,
      };

    case GOT_NOTHING:
      return {
        ...state,
        tickets: [],
        error: true,
      };
    default:
      return state;
  }
};
