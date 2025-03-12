"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";


export default function UserList() {
  const { dataGridProps } = useDataGrid({ resource: "users", });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "email",
        flex: 1,
        headerName: "Email",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "gender",
        flex: 1,
        headerName: "Gender",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "birth_date",
        flex: 1,
        headerName: "Birth Date",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "phone",
        flex: 1,
        headerName: "Phone",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
