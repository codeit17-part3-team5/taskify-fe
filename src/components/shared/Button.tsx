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
      className={`${className} ${
        disabled ? "bg-[#9FA6B2]" : "bg-[#5534DA] cursor-pointer"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
