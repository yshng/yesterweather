interface RowProps {
  cells: (string | undefined)[];
  hour: number;
}

export function TableRow({ cells }: RowProps) {

  return cells && (
    
    <tr key={cells[0]}>
      
    </tr>
  )
}
