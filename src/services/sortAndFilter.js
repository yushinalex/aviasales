export const sortAndFilter = (tickets, option, filters) => {
  if (!tickets) {
    return tickets;
  }
  const sorted = tickets.slice();

  if (option === 'cheapest') {
    sorted.sort((a, b) => a.price - b.price);
  }
  if (option === 'fastest') {
    sorted.sort((a, b) => {
      const totalA = a.segments[0].duration + a.segments[1].duration;
      const totalB = b.segments[0].duration + b.segments[1].duration;
      return totalA - totalB;
    });
  }
  if (option === 'optimal') {
    sorted.sort((a, b) => a.price - b.price);
  }

  const result = sorted.filter((ticket) => {
    const stops = ticket.segments[0].stops.length + 2;
    const backStops = ticket.segments[1].stops.length + 2;
    return filters.includes(stops) && filters.includes(backStops);
  });

  return result;
};
