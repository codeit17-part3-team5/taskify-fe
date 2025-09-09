type InputProps = {
  type:
    | "text"
    | "textarea"
    | "password"
    | "radio"
    | "checkbox"
    | "file"
    | "select"
    | "button"
    | "submit"
    | "date"
    | "fieldset";
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

const base =
  "w-full border border-[#d9d9d9] rounded-xl text-base text-[#333236] focus:border-[#5334DA] outline-none";

export default function Input({
  type,
  placeholder,
  value,
  className,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${
        className ?? ""
      } pl-[10px]  border border-[#d9d9d9] rounded-xl text-base text-[#333236] placeholder:text-[#9FA6B2] focus:border-[#5334DA] outline-none`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
