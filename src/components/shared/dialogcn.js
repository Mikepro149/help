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
        <DialogHeader className="bg-orange-100 -m-6 mb-0 p-6 rounded-t-lg">
          {title && <DialogTitle className="text-3xl font-semibold text-center" >{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
