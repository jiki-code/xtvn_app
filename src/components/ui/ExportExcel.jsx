'use client';

import React, { useMemo } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { getCurrentDate } from '@/lib/utils';

const getByPath = (obj, path) => {
  return path.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
};

export function ExcelExport({
  headers,
  data,
  fileName = 'export_data', // default: export_data.xlsx
  sheetName = 'Sheet1',     // default: Sheet1
  trigger,
}) {
  const flattened = useMemo(() => {
    return data.map((row) => {
      const out = {};
      headers.forEach((h) => {
        out[h.key] = getByPath(row, h.key) ?? '';
      });
      return out;
    });
  }, [data, headers]);

  const currentDate = getCurrentDate();
  const exportName = `${fileName}${currentDate}`;

  const handleExport = async () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(sheetName);

    // 1) Define column + width according to headers
    ws.columns = headers.map((h) => ({
      header: h.label,
      key: h.key,
      width: h.width ?? 18, // default
    }));

    // 2) get data for file
    flattened.forEach((row) => ws.addRow(row));

    // 3) create style border for table
    const headerRow = ws.getRow(1);
    headerRow.font = { bold: true };

    const borderThin = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    // apply border into table
    ws.eachRow({ includeEmpty: false }, (row) => {
      row.eachCell({ includeEmpty: false }, (cell) => {
        cell.border = borderThin;
      });
    });

    // 4) function export file
    const buf = await wb.xlsx.writeBuffer();
    saveAs(
      new Blob([buf], { type: 'application/octet-stream' }),
      `${exportName}.xlsx`
    );
  };

  const Element = React.isValidElement(trigger) ? (
    React.cloneElement(trigger, {
      onClick: handleExport,
      ...(trigger.props || {}),
    })
  ) : (
    <Button
      onClick={handleExport}
      size="sm"
      className="cursor-pointer mt-3"
    >
      {trigger ?? 'Export excel'}
    </Button>
  );

  return Element;
}
