import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { sortAndFilter } from '../../services/sortAndFilter';
import Ticket from '../Ticket';

import style from './ticket-list.module.scss';

function TicketList() {
  const [current, setCurrent] = useState(5);

  const newId = useRef(1);

  const { tickets, loading, error } = useSelector((state) => {
    const { ticketReducer } = state;
    return ticketReducer;
  });

  const option = useSelector((state) => {
    const { sortReducer } = state;
    return sortReducer.option;
  });

  const filters = useSelector((state) => {
    const { filterReducer } = state;
    return filterReducer.ids;
  });

  const sorted = sortAndFilter(tickets, option, filters);

  const elements = sorted.slice(0, current).map((el) => (
    <li key={newId.current++} className={style['ticket-list-element']}>
      <Ticket {...el} />
    </li>
  ));

  const spin = (
    <div className={style['list-spinner']}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    </div>
  );
  const spinner = loading ? spin : null;

  const noResultMessage =
    !sorted.length > 0 && !loading && !error ? (
      <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" showIcon />
    ) : null;

  const errorMessage = error ? (
    <Alert
      message="OOPS! Something has gone wrong! Failed to load resource, try to reload page!"
      type="error"
      showIcon
    />
  ) : null;

  const showMoreButton =
    sorted.length > 0 && !error && current < sorted.length ? (
      <button className={style['ticket-list-button']} type="button" onClick={() => setCurrent((state) => state + 5)}>
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    ) : null;

  return (
    <div className={style['ticket-block']}>
      {spinner}
      {errorMessage}
      {noResultMessage}
      <ul className={style['ticket-list']}>{elements}</ul>
      {showMoreButton}
    </div>
  );
}

export default TicketList;
