'use client';

import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HabbitCard from './components/habbitCard';
import {Day} from './types/types';
import Graph from './components/graph';

export default function Home() {
  const [days, setDays] = useState<Day[]>([
    {
      id: 1,
      date: '29/09/2021',
      habbits: [
        {
          id: 1,
          name: 'Running',
          status: true,
        },
        {
          id: 2,
          name: 'Reading',
          status: false,
        },
        {
          id: 3,
          name: 'Coding',
          status: false,
        },
      ],
    },
    {
      id: 2,
      date: '30/09/2021',
      habbits: [
        {
          id: 1,
          name: 'Running',
          status: false,
        },
        {
          id: 2,
          name: 'Reading',
          status: false,
        },
        {
          id: 3,
          name: 'Coding',
          status: false,
        },
      ],
    },
    {
      id: 3,
      date: '7/1/2024',
      habbits: [
        {
          id: 1,
          name: 'Running',
          status: false,
        },
        {
          id: 2,
          name: 'Reading',
          status: false,
        },
        {
          id: 3,
          name: 'Coding',
          status: false,
        },
      ],
    },
  ]);

  return (
    <main>
      <div>
        <Navbar />
        <h1>Habbit Tracker</h1>
        <p>Track your habits</p>
      </div>
      <div className='bg-blue-500 flex flex-wrap'>
        {days.map((day) => (
          <div key={day.id} className='w-1/5 min-h-80 max-h-80 p-4'>
            <HabbitCard day={day} setDays={setDays} />
          </div>
        ))}
      </div>
      <Graph />
    </main>
  );
}
