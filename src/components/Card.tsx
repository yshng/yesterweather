interface CardProps {
  id: string;
  header: string;
  children: React.ReactNode;
}

export function Card({id, header, children}: CardProps) {
  return (
    <div className="card" id={id}>
      <h1 className="card-head">{header}</h1>
      {children}
    </div>
  )
}