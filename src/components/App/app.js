import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getTickets } from '../../redux/actions';
import Menu from '../Menu';
import TicketList from '../Ticket-list';
import Filter from '../Filter/filter';
import Logo from '../../assets/Logo.svg';

import style from './app.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  return (
    <section className={style.app}>
      <div className={style.header}>
        <img src={Logo} alt="logo" />
      </div>
      <section className={style.main}>
        <Filter />
        <section className={style.content}>
          <Menu />
          <TicketList />
        </section>
      </section>
    </section>
  );
}

export default App;
