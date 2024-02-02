/* eslint-disable jsx-a11y/label-has-associated-control */
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
      <li key={el.id} className={classNames}>
        <label>
          <input
            className={style['menu-button--radio']}
            name="option"
            type="radio"
            onChange={() => despatch(getSorted(el.id))}
          />
          <span className={style['menu-button--text']}>{el.label}</span>
        </label>
      </li>
    );
  });

  return (
    <div>
      <ul className={style.menu}>{elements}</ul>
    </div>
  );
}

Menu.propTypes = {};

export default Menu;
