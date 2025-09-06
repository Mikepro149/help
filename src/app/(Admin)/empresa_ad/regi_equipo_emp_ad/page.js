"use client";

import DialogCn  from "@/components/shared/dialogcn";
import { TabsCn } from '@/components/shared/tabscn';

import { useState } from "react";
export default function registroequipoempresaAD() {
  const steps = ['Usuario', 'Hardware', 'Software'];
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

      {step === 0 && <div>
        <span>Usuario:</span>
        <input
        placeholder="Hola">
        </input>
        </div>}
      {step === 1 && <div>Contenido de Contacto</div>}
      {step === 2 && <div>Contenido de Sucursal</div>}
      {step === 3 && <div>Contenido de Datos de acceso</div>}
    </div>
      </DialogCn>
    );
}