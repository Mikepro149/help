'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];

const data = [
  {
    sucursal: 'm5gr84i9',
    contacto: 'success',
    telefono: 954745478,
    correo: 'jauyadn@gmail.com',
  },
  {
    sucursal: '3u1reuv4',
    contacto: 'success',
    telefono: 96374634,
    correo: 'Abe45@example.com',
  },
  {
    sucursal: 'derv1ws0',
    contacto: 'processing',
    telefono: 967568347,
    correo: 'Monserrat44@example.com',
  },
  {
    sucursal: '5kma53ae',
    contacto: 'processing',
    telefono: 967568347,
    correo: 'Silas22@example.com',
  },
  {
    sucursal: 'bhqecj4p',
    contacto: 'processing',
    telefono: 967568347,
    correo: 'carmella@example.com',
  },
];

export default function RegistrarSucursal() {
  const { id } = useParams();
  const router = useRouter();
  const step = 2;

  const [selectAll, setSelectAll] = useState(false);

  const columns = [
    {
      accessorKey: 'sucursal',
      header: 'Área',
      cell: ({ row }) => <div>{row.getValue('sucursal')}</div>,
    },
    {
      accessorKey: 'contacto',
      header: 'Contacto',
      cell: ({ row }) => <div>{row.getValue('contacto')}</div>,
    },
    {
      accessorKey: 'telefono',
      header: 'Teléfono',
      cell: ({ row }) => <div>{row.getValue('telefono')}</div>,
    },
    {
      accessorKey: 'correo',
      header: 'Correo',
      cell: ({ row }) => <div>{row.getValue('correo')}</div>,
    },
    {
      id: 'seleccionar',
      header: () => (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={(e) => setSelectAll(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              router.push('/cliente_ad/area');
            }
          }}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Registrar Cliente</h2>

      {/* Tabs */}
      <div style={tabContainerStyle}>
        {steps.map((label, index) => (
          <button
            key={index}
            style={{
              ...tabStyle,
              backgroundColor: step === index ? 'orange' : '#eee',
              color: step === index ? 'white' : 'black',
              fontWeight: step === index ? 'bold' : 'normal',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-md border" style={{ marginBottom: '30px' }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={() => router.push('/cliente_ad/sucursal')}
          style={navBtnStyle}
        >
          Volver
        </button>
      </div>

    </div>
  );
}

// Estilos
const containerStyle = {
  width: '700px',
  margin: '50px auto',
  backgroundColor: '#fff3e0',
  padding: '30px',
  borderRadius: '12px',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: '20px',
  fontSize: '24px',
};

const tabContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '20px',
};

const tabStyle = {
  padding: '10px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'default',
};

const navBtnStyle = {
  backgroundColor: 'orange',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
