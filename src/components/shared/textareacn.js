// components/shared/CustomTextarea.js
import { Textarea } from "@/components/ui/textarea";

export function TextareaCn({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  rows = 4,
  ...props
}) {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={className}
      {...props}
    />
  );
}
