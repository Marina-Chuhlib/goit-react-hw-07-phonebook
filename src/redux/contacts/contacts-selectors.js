import { createSelector } from '@reduxjs/toolkit';

import { getFilter } from 'redux/filter/filter-selectors';

export const getAllContacts = ({ contacts }) => contacts.items;

export const getFilteredContacts = createSelector(
  [getFilter, getAllContacts],
  (filter, contacts) => {
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }
);
