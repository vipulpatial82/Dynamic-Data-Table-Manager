'use client';
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControlLabel, Checkbox, Button, TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addColumn, setVisibleColumns } from '../features/table/tableSlice';
import { inherits } from 'util';

const ColumnManager: React.FC = () => {
  const dispatch = useDispatch();
  const { columns, visibleColumns } = useSelector((state: RootState) => state.table);

  const [open, setOpen] = useState(false);
  const [newColumn, setNewColumn] = useState('');

  const handleToggle = (col: string) => {
    const updated = visibleColumns.includes(col)
      ? visibleColumns.filter(c => c !== col)
      : [...visibleColumns, col];
    dispatch(setVisibleColumns(updated));
  };

  const handleAddColumn = () => {
    if (newColumn && !columns.includes(newColumn)) {
      dispatch(addColumn(newColumn));
      setNewColumn('');
    }
  };

  return (
    <>
      <button className="control" onClick={() => setOpen(true)}>
        Manage Columns
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {columns.map(col => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={visibleColumns.includes(col)}
                  onChange={() => handleToggle(col)}
                />
              }
              label={col}
            />
          ))}
          <TextField
            label="Add New Column"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            fullWidth
            variant="standard"
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ background:'purple', color: 'white', fontWeight: 700, borderRadius: 30 }}
            onClick={handleAddColumn}
          >
            Add
          </Button>
          <Button
            style={{ background: 'purple', color: 'white', fontWeight: 700, borderRadius: 30 }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ColumnManager;
