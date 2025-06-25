import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TableRow = Record<string, any>;

interface TableState {
  data: TableRow[];
  columns: string[];
  visibleColumns: string[];
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}

const initialState: TableState = {
  data: [
    { Name: 'Alice', Email: 'alice@example.com', Age: 28, Role: 'Engineer' },
    { Name: 'Bob', Email: 'bob@example.com', Age: 34, Role: 'Manager' }
  ],
  columns: ['Name', 'Email', 'Age', 'Role'],
  visibleColumns: ['Name', 'Email', 'Age', 'Role'],
  sortBy: null,
  sortOrder: 'asc'
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    toggleSort(state, action: PayloadAction<string>) {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortOrder = 'asc';
      }
    },
    setVisibleColumns(state, action: PayloadAction<string[]>) {
      state.visibleColumns = action.payload;
    },
    setTableData(state, action: PayloadAction<TableRow[]>) {
      state.data = action.payload;
    },
    addColumn(state, action: PayloadAction<string>) {
      const column = action.payload;
      if (!state.columns.includes(column)) {
        state.columns.push(column);
        state.visibleColumns.push(column);
        state.data = state.data.map(row => ({
          ...row,
          [column]: ''
        }));
      }
    }
  }
});

export const {
  toggleSort,
  setVisibleColumns,
  setTableData,
  addColumn
} = tableSlice.actions;

export default tableSlice.reducer;
