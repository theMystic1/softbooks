import { BtnProps } from "@/tsconfig/types";

function SubmitBtn({
  text,
  onClick,
  type = "submit",
  category = "primary",
}: BtnProps) {
  return (
    <button
      className={`${category === "primary" ? "form-btn" : ""}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default SubmitBtn;
