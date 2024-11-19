interface CompareTempProps {
  pre?: string;
  difference: number;
  post?: string;
}

export function CompareTemp({ pre, difference, post }: CompareTempProps) {
  difference = Math.round(difference);
  return difference > 0 ? (
    <span className="warmer">{pre} +{difference}° warmer {post}</span>
  ) : (
    <span className="cooler">{pre} {difference}° cooler {post}</span>
  );
}
