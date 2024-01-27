'use client';

import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import Graph from './components/graph';
import Habbits from './components/Habbits';
import {redirect} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {Day} from './types/types';
import AuthProvider from './context/AuthProvider';

export default function Home() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });

  return (
    <main className='bg-blue-500'>
      <AuthProvider>
        <div>
          <Navbar />
        </div>
        <Habbits />
        <Graph />
        <div>
          <h1 className='text-center text-4xl'>
            Welcome {session?.user?.email}
          </h1>
        </div>
      </AuthProvider>
    </main>
  );
}
