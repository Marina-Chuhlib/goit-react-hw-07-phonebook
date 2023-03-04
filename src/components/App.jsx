import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from 'shared/Loader';

import { getFilteredContacts } from '../redux/contacts/contacts-selectors';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

import css from './App.module.css';

const App = () => {
  const isContacts = Boolean(useSelector(getFilteredContacts).length);
  const isLoading = useSelector(state => state.contacts.isLoading);

  return (
    <div className={css.wrapper}>
      <h2>Phonebook</h2>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      {isLoading && <Loader />}

      {isContacts && <ContactsList />}

      {!isContacts && !isLoading && (
        <p className={css.text}>No contacts in list</p>
      )}
      <ToastContainer autoClose={1500} position="top-center" />
    </div>
  );
};

export default App;
