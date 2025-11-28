"use client";

import { Button } from "antd";
import { FileSpreadsheet } from "lucide-react";
import { ExcelExport } from "@/components/ui/ExportExcel";

export default function ExportExcelButton({ headers, data, fileName = "export_data", title = "Export Excel" }) {
  return (
    <ExcelExport
      headers={headers}
      data={data}
      fileName={fileName}
      trigger={
        <Button
          type="primary"
          icon={<FileSpreadsheet size={16} />}
          style={{ display: "flex", alignItems: "center", gap: 6 }}
        >
          {title}
        </Button>
      }
    />
  );
}
