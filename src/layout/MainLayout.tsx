import React, { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import ToasterMolecule from '../components/Molecules/ToasterMolecule';
import { queryClient } from '../plugins/react-query';

interface PropType {
  children: ReactNode;
}
export function MainLayout({ children }: PropType) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToasterMolecule />
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </>
  );
}
