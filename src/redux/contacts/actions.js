import { createAction } from '@reduxjs/toolkit';
import { FILTER_CONTACT } from './types';

export const filterContact = createAction(FILTER_CONTACT);
