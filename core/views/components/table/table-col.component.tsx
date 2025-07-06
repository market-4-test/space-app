interface ITableColProps {
  children?: React.ReactNode;
  size?: number
}

export default function TableCol({children,size}: ITableColProps) {
  return (
    <th width={size} className={ `TableCol px-3 py-2 bg-cyan-950 text-white first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br uppercase border-r border-r-cyan-900 last:border-none` }>
      { children ? children : undefined }
    </th>
  );
}
