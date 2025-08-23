// components/shared/TableCn.js
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableCn({ columns = [], data = [] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => {
                  // Si la columna tiene un "cell", lo renderizamos
                  if (col.cell) {
                    return (
                      <TableCell key={colIndex}>
                        {col.cell({ row: { getValue: (k) => row[k] } })}
                      </TableCell>
                    );
                  }
                  // Sino, mostramos el valor del accessorKey
                  return (
                    <TableCell key={colIndex}>
                      {row[col.accessorKey]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Sin datos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
