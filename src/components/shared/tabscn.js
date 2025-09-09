'use client';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

export function TabsCn({ steps, currentStep, onStepChange }) {
  return (
    <Tabs defaultValue={steps[currentStep]} value={steps[currentStep]}>
      <TabsList className="w-full justify-center gap-2 bg-[#fff3e0] p-2 rounded-lg ">
        {steps.map((step, index) => (
          <TabsTrigger
            key={step}
            value={step}
            onClick={() => onStepChange(index)}
            className={`px-4 py-2 rounded-md font-semibold text-lg ${
              index === currentStep
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {step}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Contenido opcional si deseas manejarlo por contenido */}
      {steps.map((step, index) => (
        <TabsContent key={step} value={step}>
          {/* Aquí podrías renderizar algo condicionalmente si lo deseas */}
        </TabsContent>
      ))}
    </Tabs>
  );
}
