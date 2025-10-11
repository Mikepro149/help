import { useEffect, useLayoutEffect, useState } from 'react';

// Hook para evitar problemas de hidratación
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Hook para verificar si estamos en el cliente
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};
