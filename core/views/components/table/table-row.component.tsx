interface ITableRowProps {
  children: React.ReactNode;
}

export default function TableRow({children,}: ITableRowProps) {
  return (
    <tr className={ `TableRow bg-white hover:bg-neutral-50 transition` }>
      { children }
    </tr>
  );
}
