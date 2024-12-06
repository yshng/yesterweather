export interface CellData {
  content: number;
  headers: string;
}

export interface TableDataAttributes extends CellData{
  max: number;
  min: number;
}

export function TableData({
  content,
  headers,
  max,
  min
}: TableDataAttributes) {
  // mix background color transparency

  const spread = max-min;
  const percentile = Math.round(((content-min) / spread) * 100);
  const intensity = Math.abs(percentile - 50); 

  let bgcolor = "color-mix(in srgb,";
  const opacity = (100-(intensity*2)).toString()+"%";

  bgcolor += percentile > 50 ? "var(--warmer), " : "var(--cooler), ";
  bgcolor += `transparent ${opacity})`;

  return (
    <td headers={headers} style={{ backgroundColor: bgcolor }}>
      <p>{content}</p>
    </td>
  );
}
