import PropTypes from 'prop-types';
import React from 'react';
import ContactListItem from '../ContactListItem';
import s from './ContactList.module.css';
import { useFetchContactsQuery } from '../../redux/contacts/contactsSlice';
import Loader from 'react-loader-spinner';

const ContactList = () => {
  const { data: contacts, isFetching } = useFetchContactsQuery();

  // const dispatch = useDispatch();
  // const visibleContacts = useSelector(getVisibleContacts);
  // const onDelete = id => dispatch(deleteContact(id));
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
      {contacts &&
        contacts.map(contact => (
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
