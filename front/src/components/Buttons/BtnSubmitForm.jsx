import Button from "../ui/Button.jsx";
import { cn } from "../../utils/cn.js";

const variantMap = {
  primary: "secondary",
  success: "primary",
  danger: "danger",
  submit: "primary",
};

function BtnSubmitForm({
  type = "submit",
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  onClick,
  className = "",
}) {
  const buttonVariant = variantMap[variant] ?? "primary";

  return (
    <div className="flex justify-center">
      <Button
        type={type}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        variant={buttonVariant}
        className={cn("min-w-[200px] rounded-sm", className)}
      >
        {children}
      </Button>
    </div>
  );
}

export default BtnSubmitForm;
