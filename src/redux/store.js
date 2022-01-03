import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contactsSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import filter from './contacts/reducer';
export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filterValue: filter,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

setupListeners(store.dispatch);
