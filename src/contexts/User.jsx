import { createContext } from 'react';

export const defaultUser = {
  _id: '123',
  name: 'Ольга',
  email: '',
  token: '',
};

export const UserContext = createContext({ defaultUser });
