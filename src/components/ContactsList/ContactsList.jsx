import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';
import { fetchDeleteContact } from 'redux/contacts/contacts-operations';


import css from '../ContactsList/ContactsList.module.css';

const ContactsList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));

        toast.error('Contact deleted', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const elements = filteredContacts.map(({ id, name,phone  }) => (
    <li key={id} className={css.item}>
      <p className={css.contact}>
        {name}: <span className={css.number}>{phone}</span>{' '}
      </p>
      <button
        type="button"
        className={css.button}
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={css.list}>{elements}</ul>;
};

export default ContactsList;
