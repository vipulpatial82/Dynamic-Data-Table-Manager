'use client';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { RootState } from '../store';
import { setTableData } from '../features/table/tableSlice';

const CSVControls: React.FC = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableData = useSelector((state: RootState) => state.table.data);
  const visibleColumns = useSelector((state: RootState) => state.table.visibleColumns);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        dispatch(setTableData(results.data as any[])); 
      },
      error: (err) => {
        alert("Error parsing CSV: " + err.message);
      }
    });
  };

  const handleExport = () => {
    const dataToExport = tableData.map(row => {
      const filtered: Record<string, any> = {};
      visibleColumns.forEach(col => {
        filtered[col] = row[col];
      });
      return filtered;
    });

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "exported_data.csv");
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImport} accept=".csv" />
      <button onClick={() => fileInputRef.current?.click()}>Import CSV</button>
      <button onClick={handleExport} style={{ marginLeft: '1rem' }}>Export CSV</button>
    </div>
  );
};

export default CSVControls;
