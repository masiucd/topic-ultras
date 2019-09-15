import React from 'react';
import AppLayout from './components/styled/AppLayout';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <AppLayout>
        <Home />
      </AppLayout>
    </>
  );
}
