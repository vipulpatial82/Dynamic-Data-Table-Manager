'use client';
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Button, IconButton, Tooltip
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setTableData, toggleSort } from '../features/table/tableSlice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, columns, visibleColumns, sortBy, sortOrder } = useSelector((state: RootState) => state.table);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Record<string, any>>({});

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedRow({ ...data[index] });
  };

  const handleChange = (field: string, value: string) => {
    setEditedRow(prev => ({ ...prev, [field]: field === 'Age' ? Number(value) : value }));
  };

  const handleSave = () => {
    const updatedData = [...data];
    if (editIndex !== null) updatedData[editIndex] = editedRow;
    dispatch(setTableData(updatedData));
    setEditIndex(null);
    setEditedRow({});
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedRow({});
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const updated = [...data];
      updated.splice(index, 1);
      dispatch(setTableData(updated));
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;
    const sorted = [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortBy, sortOrder]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.filter(col => visibleColumns.includes(col)).map(column => (
              <TableCell key={column} style={{ whiteSpace: 'nowrap' }}>
                <span style={{ verticalAlign: 'middle' }}>{column}</span>
                {column === 'Name' && (
                  <IconButton
                    size="small"
                    onClick={() => dispatch(toggleSort(column))}
                    style={{ marginLeft: 4, verticalAlign: 'middle' }}
                  >
                    {sortBy === column ? (
                      sortOrder === 'asc' ? (
                        <Tooltip title="Ascending">
                          <ArrowUpwardIcon fontSize="small" color="inherit" style={{ color: 'white' }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Descending">
                          <ArrowDownwardIcon fontSize="small" color="inherit" style={{ color: 'white' }} />
                        </Tooltip>
                      )
                    ) : (
                      <Tooltip title="Sort">
                        <ArrowUpwardIcon fontSize="small" color="inherit" style={{ color: 'white', opacity: 0.4 }} />
                      </Tooltip>
                    )}
                  </IconButton>
                )}
              </TableCell>
            ))}
            <TableCell>choice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.filter(col => visibleColumns.includes(col)).map((column) => (
                <TableCell key={column}>
                  {editIndex === rowIndex ? (
                    <TextField
                      variant="standard"
                      value={editedRow[column]}
                      type={column === 'Age' ? 'number' : 'text'}
                      onChange={(e) => handleChange(column, e.target.value)}
                    />
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editIndex === rowIndex ? (
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Button
                      color="success"
                      size="small"
                      variant="contained"
                      style={{
                        minWidth: 0,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 8,
                        boxShadow: 'none',
                        color: 'white'
                      }}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      variant="outlined"
                      style={{
                        minWidth: 0,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 8,
                        color: 'white'
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 16 }}>
                    <Button
                      color="primary"
                      size="small"
                      variant="contained"
                      style={{
                        minWidth: 0,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 8,
                        boxShadow: 'none',
                        color: 'white'
                      }}
                      onClick={() => handleEdit(rowIndex)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      variant="outlined"
                      style={{
                        minWidth: 0,
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 8,
                        color: 'white'
                      }}
                      onClick={() => handleDelete(rowIndex)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
