import { TOGGLE, GOT_TICKETS, GOT_ERROR, GOT_ALL, GOT_NOTHING, SORTING } from './types';

export function toggleFilters(id) {
  return {
    type: TOGGLE,
    id,
  };
}

export function getSorted(option) {
  return {
    type: SORTING,
    payload: option,
  };
}

const gotTickets = (tickets) => ({
  type: GOT_TICKETS,
  tickets,
});

const gotError = (error) => ({
  type: GOT_ERROR,
  error,
});

const gotAll = () => ({
  type: GOT_ALL,
});

const gotNothing = () => ({
  type: GOT_NOTHING,
});

export const getTickets = () => async (dispatch) => {
  const searchIdResponse = await fetch('https://aviasales-test-api.kata.academy/search');

  if (!searchIdResponse.ok) {
    throw new Error(`Could not fetch, received ${searchIdResponse.status}`);
  }

  const res = await searchIdResponse.json();

  const { searchId } = res;

  let result = { tickets: [], stop: false };

  do {
    try {
      const ticketResponse = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

      if (!ticketResponse.ok) {
        throw new Error(`Could not fetch, received ${ticketResponse.status}`);
      }

      result = await ticketResponse.json();

      if (result === undefined) {
        dispatch(gotNothing());
        break;
      }

      dispatch(gotTickets(result.tickets));
    } catch (error) {
      const statusCode = error.message.match(/\b(\d{3})\b/)[0];
      if (statusCode < 500) {
        dispatch(gotError());
        break;
      }
    }
  } while (!result.stop);
  dispatch(gotAll());
};
