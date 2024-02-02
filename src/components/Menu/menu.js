import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSorted } from '../../redux/actions';

import style from './menu.module.scss';

function Menu() {
  const despatch = useDispatch();

  const options = [
    { id: 'cheapest', label: 'САМЫЙ ДЕШЁВЫЙ' },
    { id: 'fastest', label: 'САМЫЙ БЫСТРЫЙ' },
    { id: 'optimal', label: 'OПТИМАЛЬНЫЙ' },
  ];

  const elements = options.map((el) => {
    let classNames = [style['menu-button']];
    const sortOption = useSelector((state) => {
      const { sortReducer } = state;
      return sortReducer.option;
    });
    if (sortOption === el.id) {
      classNames.push(style['menu-button--selected']);
    }
    classNames = classNames.join(' ');

    return (
      <button key={el.id} className={classNames} type="button" onClick={() => despatch(getSorted(el.id))}>
        {el.label}
      </button>
    );
  });

  return <div className={style.menu}>{elements}</div>;
}

Menu.propTypes = {};

export default Menu;
