interface ITableBodyProps {
  children: React.ReactNode;
}

export default function TableBody({children,}: ITableBodyProps) {
  return (
    <tbody className={ `TableBody` }>
      { children }
    </tbody>
  );
}
