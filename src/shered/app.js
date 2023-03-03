import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://63fe0336cd13ced3d7c46cbc.mockapi.io/api/contacts',
});

export const fetchContacts = async () => {
  const { data } = await contactsInstance.get('/');
  // console.log(data, 'fetchContacts');
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
