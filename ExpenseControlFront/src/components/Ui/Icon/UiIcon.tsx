interface IconProps {
  data: string;
  className?: string;
}

export function UiIcon({ data, className = "" }: IconProps) {
  return (
    <svg
      className={`inline-block h-6 aspect-square align-middle fill-current ${className}`}
      viewBox="0 0 24 24"
    >
      <path d={data} />
    </svg>
  );
}