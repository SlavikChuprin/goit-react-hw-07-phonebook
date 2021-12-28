import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/actions';
import { getFilter, getContacts } from '../../redux/contacts/selectors';

const Filter = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  if (!contacts.length)
    return <p>Your phonebook is empty. Please add contact.</p>;

  return (
    <div className={s.filterWrapper}>
      <label>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={event => dispatch(filterContact(event.target.value))}
          className={s.filterInput}
        />
      </label>
    </div>
  );
};

Filter.prototype = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
