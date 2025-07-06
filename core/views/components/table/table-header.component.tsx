import TableRow from "./table-row.component";

interface ITableHeaderProps {
  children: React.ReactNode;
}

export default function TableHeader({children,}: ITableHeaderProps) {
  return (
    <thead className={ `TableHeader text-left font-semibold` }>
      <TableRow>
        { children }
      </TableRow>
    </thead>
  );
}
