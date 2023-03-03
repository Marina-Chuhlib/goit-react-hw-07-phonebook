import { createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../../shered/app';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.fetchContacts();
      console.log(data, 'fetch');
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      console.log(result, 'add');
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      console.log(contacts, 'ho');
      const normalizedTitle = name.toLowerCase();
      const result = contacts.items.find(({ name }) => {
        return name.toLowerCase() === normalizedTitle;
      });
      if (result) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
