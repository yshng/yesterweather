interface CompareTempProps {
  pre?: string;
  difference: number;
  post?: string;
}

export function CompareTemp({ pre, difference, post }: CompareTempProps) {
  difference = Math.round(difference);
  if (difference == 0) return (<span> the same temperature as </span>)
  return difference > 0 ? (
    <> <span className="warmer">{pre} {difference}° warmer {post}</span> than </>
  ) : (
    <> <span className="cooler">{pre} {difference*-1}° cooler {post}</span> than </>
  );
}
