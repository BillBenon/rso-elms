import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ToasterMolecule from '../components/Molecules/ToasterMolecule';

interface PropType {
  children: ReactNode;
}
export function MainLayout({ children }: PropType) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToasterMolecule />
        {children}
      </QueryClientProvider>
    </>
  );
}
