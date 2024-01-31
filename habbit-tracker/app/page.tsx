'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Graph from './components/graph';
import Habbits from './components/Habbits';
import AuthProvider from './context/AuthProvider';

export default function Home() {
  return (
    <main className='bg-blue-500'>
      <AuthProvider>
        <div>
          <Navbar />
        </div>
        <Habbits />
        <Graph />
      </AuthProvider>
    </main>
  );
}
