// components/shared/PaginationCn.js
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationCn({ page, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={page === 1}
        className="gap-2"
      >
        <ChevronLeft size={16} />
        Anterior
      </Button>

      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={page === totalPages}
        className="gap-2"
      >
        Siguiente
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
