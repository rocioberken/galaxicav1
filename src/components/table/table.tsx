import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.scss";


export type ProductProps = {
  id: number;
  company: string;
  cuit: string;
  country: string;
  area: string;
  date: string;
  status: boolean;
  areacode: number;
  paymentMethod: string;

};

type Props = {
  data: ProductProps[];
};

const defaultColumns: ColumnDef<ProductProps>[] = [
  {
    header: "Rubro y Codigo",
    accessorKey: "areacode",
    cell: ({ row }) => (
      <>
        {row.original.areacode}
        <br />
        <span className={styles.area}>{row.original.area}</span>

      </>
    ),
  },
  {
    header: "Nombre y CUIT",
    accessorKey: "company",
    cell: ({ row }) => (
      <>
      {row.original.company}
      <br />
        <span className={styles.cuit}>{row.original.cuit}</span>
      
      </>
    ),
  },    
 {
    header: "Publica",
    accessorKey: "status",
  },
   {
    header: "Fecha ultimo estado",
    accessorKey: "date",
  },
  {
    header: "Pais",
    accessorKey: "country",
  },
];


export const Table = ({ data }: Props) => {
  const [selectedRow, setSelectedRow] = useState<ProductProps | null>(null);

  const handleRowClick = (row: ProductProps) => {
    setSelectedRow(row);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };
  const [columns] = React.useState(() => [...defaultColumns]);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false, // Only allow ascending/descending, not unsorted
  });

  return (
    <div className={styles.tableContainer}>
      <h2>Resultado</h2>
      <p>Resultados para</p>
      <table className={styles.transactions}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              className={styles.clickableRow}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {selectedRow && (
            <div className={styles.drawer} onClick={handleClose}>
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={handleClose} className={styles.closeButton}>
                  ×
                </button>
                <div className={styles.productImage}> <img src="./product.jpg" alt="" /></div>

                <div className={styles.productDataTable}>
                  <h3>
                    {selectedRow.company} <p>Lyla - L12</p>
                  </h3>
                  <table>
                    <tbody>
                    
                      <tr>
                        <th>Date:</th>
                        <td>{selectedRow.date}</td>
                      </tr>
                      <tr>
                        <th>Amount:</th>
                        <td>{selectedRow.country}</td>
                      </tr>
                      <tr>
                        <th>Payment Method:</th>
                        <td>{selectedRow.paymentMethod}</td>
                      </tr>
                      <tr>
                        <th>Transaction ID:</th>
                        <td>#{selectedRow.id}</td>
                      </tr>
                    </tbody>
                  </table>{" "}
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};
