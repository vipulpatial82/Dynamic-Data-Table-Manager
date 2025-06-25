'use client';
import { Switch, FormControlLabel } from '@mui/material';
import React from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }: { darkMode: boolean, toggleTheme: () => void }) => (
  <FormControlLabel
    control={<Switch checked={darkMode} onChange={toggleTheme} />}
    label="Dark Mode"
  />
);

export default ThemeToggle;
