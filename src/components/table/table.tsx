import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./table.module.css";
import { Status } from "../status/status";

export type ProductStatusProps = "Approved" | "Pending" | "Rejected";

export type ProductProps = {
  id: number;
  customer: string;
  date: string;
  product: string;
  status: ProductStatusProps;
  email: string;
  amount: string;
  paymentMethod: string;
};

type Props = {
  data: ProductProps[];
};

const defaultColumns: ColumnDef<ProductProps>[] = [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: ({ row }) => (
      <>
        <span className={styles.customer}>{row.original.customer}</span>
        <br />
        {row.original.email}
      </>
    ),
  },
  {
    accessorKey: "date",
    cell: (info) => <span className="hideMobile">{info.getValue() as string}</span>,
    header: () => <span className="hideMobile">Date</span>,
  },
  {
    accessorKey: "product",
    cell: (info) => <span className="hideMobile">{info.getValue() as string}</span>,
    header: () => <span className="hideMobile">Product</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <Status status={row.original.status} />,
  },
  {
    header: "Amount",
    accessorKey: "amount",
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
  });

  return (
    <div className={styles.tableContainer}>
      <h2>Transactions</h2>
      <p>Recent transactions from your store.</p>
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
                <div className={styles.productImage}> <img src="./../public/product.jpg" alt="" /></div>

                <div className={styles.productDataTable}>
                  <h3>
                    {selectedRow.product} <p>Lyla - L12</p>
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <th>Status</th>
                        <td>
                          <Status status={selectedRow.status} />
                        </td>
                      </tr>

                      <tr>
                        <th>Date:</th>
                        <td>{selectedRow.date}</td>
                      </tr>
                      <tr>
                        <th>Amount:</th>
                        <td>{selectedRow.amount}</td>
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
