import PropTypes from 'prop-types';
import React from 'react';
import ContactListItem from '../ContactListItem';
import s from './ContactList.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchContactsQuery } from '../../redux/contacts/contactsSlice';
import { filterValue } from '../../redux/contacts/selectors';
import Loader from 'react-loader-spinner';

const ContactList = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [filterContacts, setContacts] = useState([]);
  const value = useSelector(filterValue);

  useEffect(() => {
    try {
      setContacts(
        contacts.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    } catch (error) {
      return error;
    }
  }, [contacts, value]);

  return (
    <ul className={s.contactList}>
      {isFetching && (
        <Loader
          type="Circles"
          color="lightblue"
          height={80}
          width={80}
          timeout={0}
        />
      )}
      {filterContacts &&
        filterContacts.map(contact => (
          <ContactListItem key={contact.id} contact={contact} />
        ))}
    </ul>
  );
};

ContactList.prototype = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
