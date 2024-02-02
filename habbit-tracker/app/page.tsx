'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Habbits from './components/Habbits';
import AuthProvider from './context/AuthProvider';
import HabbitGraph from './components/habbitGraph';

export default function Home() {
  return (
    <main className='bg-blue-500 min-h-screen'>
      <AuthProvider>
        <div>
          <Navbar />
        </div>
        <div className='flex'>
          <div className='w-2/3'>
            <Habbits />
          </div>
          <div className='w-1/3'>
            <HabbitGraph />
          </div>
        </div>
      </AuthProvider>
    </main>
  );
}
