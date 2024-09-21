import { IWidgetTableData } from "@/types/general";
import { Table } from "flowbite-react";

interface EntityTableProps {
  data?: IWidgetTableData;
}

export default function EntityTable({ data }: EntityTableProps) {
  if (!data) {
    return;
  }

  return (
    <Table className=" w-full">
      <Table.Head>
        {data.columns.map((col) => (
          <Table.HeadCell key={col.key}>{col.name}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row>
          {data.columns.map((col) => (
            <Table.Cell key={col.key}>test {col.name}</Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          {data.columns.map((col) => (
            <Table.Cell key={col.key}>test {col.name}</Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          {data.columns.map((col) => (
            <Table.Cell key={col.key}>test {col.name}</Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
