import React from 'react';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='fixed p-4 inset-0 w-full h-full bg-black/50 backdrop-blur-sm z-50 flex  items-center justify-center animate-in fade-in-0 duration-300'>
      {children}
    </section>
  );
};
