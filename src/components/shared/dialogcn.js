// components/shared/DialogCn.js
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DialogCn({
  triggerLabel,
  title,
  description,
  children,
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#f89e1b] text-white px-4 py-2 rounded hover:bg-[#e08d19]">
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
