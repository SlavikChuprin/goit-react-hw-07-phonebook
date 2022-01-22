import s from './ContactForm.module.css';
import { useState } from 'react';
import { useCreateContactMutation } from '../../redux/contacts/contactsSlice';
import { useFetchContactsQuery } from '../../redux/contacts/contactsSlice';
import Loader from 'react-loader-spinner';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [createContact, { isLoading: isUpdating }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : createContact(name, number);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button type="submit" className={s.btn} disabled={isUpdating}>
        {isUpdating ? (
          <Loader type="Circles" color="lightblue" height={20} width={100} />
        ) : (
          'Add contact'
        )}
      </button>
    </form>
  );
}

export default ContactForm;
