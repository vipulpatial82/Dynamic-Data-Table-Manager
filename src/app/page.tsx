'use client';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import { lightTheme, darkTheme } from './theme';

import ThemeToggle from './components/ThemeToggle';
import CSVControls from './components/CSVControls';
import ColumnManager from './components/ColumnManager';
import DataTable from './components/DataTable';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <main style={{ padding: '2rem' }}>
            <h1>Dynamic Data Table Manager</h1>
            <ThemeToggle darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
            <div className="control-row">
              <CSVControls />
              <ColumnManager />
            </div>
            <DataTable />
          </main>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
