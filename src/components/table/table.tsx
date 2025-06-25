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


export type PDF = {
  year: number;
  url: string;
  name: string;
};

export type CompanyProps = {
  pdfs: PDF[];
  description: string;
  id: number;
  company: string;
  cuit: string;
  country: string;
  area: string;
  date: string;
  status: boolean;
  areacode: number;
};

type Props = {
  data: CompanyProps[];
};

const defaultColumns: ColumnDef<CompanyProps>[] = [
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
  const [selectedRow, setSelectedRow] = useState<CompanyProps | null>(null);

  const handleRowClick = (row: CompanyProps) => {
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
      {/* <h2>Resultado</h2>
      <p>Resultados para <span> </span></p> */}
      <table className={styles.itemsTable}>
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
                <div className={styles.closeDrawer}>
                  <button onClick={handleClose} className={styles.backButton}>
                  〱 
                  </button>
                  <button onClick={handleClose} className={styles.closeButton}>
                  ╳
                  </button>
                </div>
                
                <div>
                  <h3>
                    {selectedRow.company} 
                  </h3>

                  <table className={styles.companyDataTable}>
                    <tbody>
                    <td className={styles.infoCell}>
                      <tr>
                        <th>Rubro:</th>
                        <td>{selectedRow.area}</td>
                      </tr>
                       <tr>
                        <th>Codigo SIC:</th>
                        <td>{selectedRow.areacode}</td>
                      </tr>
                      <tr>
                        <th>Cuit:</th>
                        <td>{selectedRow.cuit}</td>
                      </tr>
                      <tr>
                        <th>Publica:</th><td>
                        {selectedRow.status ? "true" : "false"}</td>
                      </tr>
                      <tr>
                        <th>País:</th>
                        <td>{selectedRow.country}</td>
                      </tr>
                      
                    </td>
                    <td className={styles.descriptionCell}> 
                         <p>{selectedRow.description}</p>
                    </td>
                      
                    </tbody>
                  </table>{" "}
                
                <div >
                  <h4>  </h4>
                  <table className={styles.companyPDF}>
                    <thead>
                      <tr>
                        <th>Año</th>
                        <th>ver PDF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRow.pdfs.map((pdf) => (
                        <tr key={pdf.year}>
                          <td>{pdf.year}</td>
                          <td>
                            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                              {pdf.name}
                            </a>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>{" "}
                </div>
                </div>
               
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};
