import { createAction } from '@reduxjs/toolkit';
import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './types';
import { v4 as uuidv4 } from 'uuid';

export const addContact = createAction(ADD_CONTACT, (name, number) => ({
  payload: { id: uuidv4(), name, number },
}));

export const deleteContact = createAction(DELETE_CONTACT);

export const filterContact = createAction(FILTER_CONTACT);
