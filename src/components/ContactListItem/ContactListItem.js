import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';
import { useDeleteContactMutation } from '../../redux/contacts/contactsSlice';
import Loader from 'react-loader-spinner';

const ContactListItem = ({ contact }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <li className={s.contactItem}>
      {contact.name}: {contact.phone}
      <button
        type="button"
        className={s.btnDel}
        disabled={isDeleting}
        onClick={() => deleteContact(contact.id)}
      >
        {isDeleting ? (
          <Loader
            type="Circles"
            color="lightblue"
            height={12}
            width={12}
            timeout={0}
          />
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
};

ContactListItem.prototype = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactListItem;
