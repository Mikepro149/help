"use client";

import DialogCn  from "@/components/shared/dialogcn";
import { TabsCn } from '@/components/shared/tabscn';

import { useState } from "react";
export default function registropersonaTI() {
  const steps = ['Empresa', 'Contacto', 'Sucursal', 'Datos de acceso'];
  const [step, setStep] = useState(0);
    return (
      <DialogCn
        triggerLabel="Abrir modal"
        title="Título del modal"
        description="Esta es una descripción del diálogo"
      >
      <div>
      <h2 >Registrar Cliente</h2>

      {/* ✅ Reemplazo de tabs manuales por CustomTabs */}
      <TabsCn
        steps={steps}
        currentStep={step}
        onStepChange={(newIndex) => setStep(newIndex)}
      />

      {step === 0 && <div>Contenido de Empresa</div>}
      {step === 1 && <div>Contenido de Contacto</div>}
      {step === 2 && <div>Contenido de Sucursal</div>}
      {step === 3 && <div>Contenido de Datos de acceso</div>}
    </div>
      </DialogCn>
    );
}