// components/shared/CustomButton.js
import { Button } from "@/components/ui/button";

export function ButtonCn({
  label,
  onClick,
  variant = "default",
  disabled = false,
}) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}
