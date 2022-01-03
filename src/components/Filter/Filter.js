import React from 'react';
import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterValue } from '../../redux/contacts/selectors';
import { filterContact } from '../../redux/contacts/actions';
import { useFetchContactsQuery } from '../../redux/contacts/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterValue);
  const { data: contacts, isLoading } = useFetchContactsQuery();

  if (!isLoading && !contacts.length) {
    return <p>Your phonebook is empty. Please add contact.</p>;
  }
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

export default Filter;
