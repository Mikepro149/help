// components/shared/DropdownCn.js
"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function DropdownCn({
  triggerLabel = "Opciones",
  items = [],
  label = null, // opcional, puede ser "Acciones", etc.
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-[#f89e1b] text-white px-4 py-2 rounded hover:bg-[#e08d19]">
          {triggerLabel}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onSelect}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
