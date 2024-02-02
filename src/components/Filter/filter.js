/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleFilters } from '../../redux/actions';

import style from './filter.module.scss';

function Filter() {
  const options = [
    { id: 1, label: 'Все' },
    { id: 2, label: 'Без пересадок' },
    { id: 3, label: '1 пересадка' },
    { id: 4, label: '2 пересадки' },
    { id: 5, label: '3 пересадки' },
  ];

  const isChecked = useSelector((state) => {
    const { filterReducer } = state;
    return filterReducer.ids;
  });

  const despatch = useDispatch();

  const handleFilters = (id) => {
    despatch(toggleFilters(id));
  };

  const elements = options.map((el) => (
    <div className={style['filter-item']} key={el.id}>
      <label className={style['filter-label']}>
        <input
          className={style['filter-input']}
          type="checkbox"
          id={el.id}
          onChange={() => handleFilters(el.id)}
          checked={isChecked.includes(el.id)}
        />
        <span className={style['filter-checkbox']} />
        <span className={style['filter-text']}>{el.label}</span>
      </label>
    </div>
  ));

  return (
    <div className={style.filter}>
      <h3 className={style['filter-tittle']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <form className={style['filter-options']}>{elements}</form>
    </div>
  );
}

export default Filter;
