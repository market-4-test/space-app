interface ITableProps {
  children: React.ReactNode;
}

export default function Table({children,}: ITableProps) {
  return (
    // <table className={ `Table block w-full overflow-x-auto` }>
    <table className={ `Table w-full` }>
      { children }
    </table>
  );
}
