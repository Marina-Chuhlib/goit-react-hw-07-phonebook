import { createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';

import * as api from '../../shered/app';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.fetchContacts();
      //   console.log(data, 'fetch');
      return data;
    } catch ({ response }) {
      toast.error(` Sorry,${response.data}`);
      return rejectWithValue(response.data);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      toast.success('Success,contact added');
      const result = await api.addContact(data);
      return result;
    } catch ({ response }) {
      toast.error(` Sorry,${response.data}`);
      return rejectWithValue(response.data);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      const normalizedTitle = name.toLowerCase();
      const result = contacts.items.find(({ name }) => {
        return name.toLowerCase() === normalizedTitle;
      });
      if (result) {
        toast.warning(`${name} is already in contacts`, {
          autoClose: 3000,
        });
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
      toast.error(` Sorry,${response.data}`);
      return rejectWithValue(response.data);
    }
  }
);
