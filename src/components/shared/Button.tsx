type ButtonProps = {
  type: "submit" | "button" | "reset";
  disabled: boolean;
  label: string;
  className: string;
  onClick?: () => void;
};

export default function Button({
  type,
  disabled,
  label,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
