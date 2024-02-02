import React from 'react';
import { format } from 'date-fns';

import style from './ticket.module.scss';

function Ticket(props) {
  const { price, carrier, segments } = props;

  const ticketInfo = (index) => {
    const time = new Date(segments[index].date);

    const convertDuration = (duration) => duration * 60 * 1000;

    const helper = (length) => {
      if (length === 0) {
        return 'пересадок';
      }
      if (length === 1) {
        return 'пересадка';
      }
      return 'пересадки';
    };

    const timeHelper = (duration) => {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}ч ${minutes}м`;
    };

    return (
      <div className={style['ticket-info']}>
        <div className={style['ticket-details']}>
          <span
            className={style['ticket-details-tittle']}
          >{`${segments[index].origin} – ${segments[index].destination}`}</span>
          <span>{`${format(time.getTime(), 'HH:mm')} - ${format(
            time.getTime() + convertDuration(segments[index].duration),
            'HH:mm'
          )}`}</span>
        </div>
        <div className={style['ticket-details']}>
          <span className={style['ticket-details-tittle']}>В ПУТИ</span>
          <span>{timeHelper(segments[index].duration)}</span>
        </div>
        <div className={style['ticket-details']}>
          <span className={style['ticket-details-tittle']}>
            {`${segments[index].stops.length || 'НЕТ'} ${helper(segments[index].stops.length).toUpperCase()}`}
          </span>
          <span>{segments[index].stops.join(', ')}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={style.ticket}>
      <div className={style['ticket-top']}>
        <div className={style['ticket-price']}>{`${price} P`}</div>
        <div className={style['ticket-company']}>
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="company-logo" />
        </div>
      </div>
      {ticketInfo(0)}
      {ticketInfo(1)}
    </div>
  );
}

export default Ticket;
