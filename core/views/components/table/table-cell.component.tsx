interface ITableCellProps {
  children?: React.ReactNode;
  className?: string;
  size?: number
}

export default function TableCell({children,className,size}: ITableCellProps) {
  return (
    <td width={size} className={ `TableCell px-3 py-2${className ? ' ' + className : ''}` }>
      { children ? children : undefined }
    </td>
  );
}
