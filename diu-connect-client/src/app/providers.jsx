'use client';

import { Provider } from 'react-redux';
import { useMemo } from 'react';
import { makeStore } from './store';

export default function Providers({ children }) {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}