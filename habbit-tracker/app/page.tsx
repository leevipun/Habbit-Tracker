'use client';

import React, {useEffect, useState} from 'react';
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

  const checkIfToday = () => {
    const today = new Date();
    const todayFormatted = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    const isTodayAlreadyAdded = days.some((day) => day.date === todayFormatted);
    if (!isTodayAlreadyAdded) {
      setDays((prevDays) => [
        ...prevDays,
        {
          id: prevDays.length + 1,
          date: todayFormatted,
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
    }
  };

  checkIfToday();

  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className='bg-blue-500 flex flex-wrap min-h-300'>
        {days.map((day) => (
          <div key={day.id} className='w-1/5 min-h-80 max-h-300 p-4'>
            <HabbitCard day={day} setDays={setDays} />
          </div>
        ))}
      </div>
      <Graph days={days} />
    </main>
  );
}
