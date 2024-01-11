'use client';

import React, {useState} from 'react';
import Navbar from './components/Navbar';
import HabbitCard from './components/habbitCard';
import {Day} from './types/types';
import Graph from './components/graph';
import {Button} from 'antd';

export default function Home() {
  const [visibleData, setVisibleData] = useState<number>(6);

  const [days, setDays] = useState<Day[]>([
    {
      id: 3,
      date: '7/1/2024',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 4,
      date: '10/15/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 5,
      date: '12/5/2023',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 6,
      date: '5/20/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 7,
      date: '8/8/2023',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 8,
      date: '2/14/2024',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 9,
      date: '11/11/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 10,
      date: '3/25/2023',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 11,
      date: '6/8/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 12,
      date: '9/1/2023',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 13,
      date: '4/12/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 14,
      date: '1/30/2024',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 15,
      date: '7/17/2022',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 16,
      date: '10/5/2023',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 17,
      date: '5/28/2022',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 18,
      date: '12/10/2022',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 19,
      date: '2/22/2023',
      habbits: [
        {id: 1, name: 'Running', status: false},
        {id: 2, name: 'Reading', status: false},
        {id: 3, name: 'Coding', status: false},
      ],
    },
    {
      id: 20,
      date: '8/14/2024',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: true},
      ],
    },
    {
      id: 21,
      date: '8/14/2021',
      habbits: [
        {id: 1, name: 'Running', status: true},
        {id: 2, name: 'Reading', status: true},
        {id: 3, name: 'Coding', status: true},
      ],
    },
  ]);
  const TotalRows = days.length / 6;

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
          id: prevDays.length + 10,
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

  const sortedDays: Day[] = days.sort((a, b) => {
    const formattedDays = a.date.split('/');
    const formattedDaysB = b.date.split('/');
    const dateA = new Date(
      parseInt(formattedDays[2]),
      parseInt(formattedDays[0]),
      parseInt(formattedDays[1])
    );
    const dateB = new Date(
      parseInt(formattedDaysB[2]),
      parseInt(formattedDaysB[0]),
      parseInt(formattedDaysB[1])
    );
    // Compare dates
    return dateA.getTime() - dateB.getTime();
  });

  const renderRows = () => {
    const visibleDays = sortedDays.reverse().slice(0, visibleData);
    return visibleDays.map((day) => (
      <div key={day.id} className='w-1/6 min-h-80 max-h-300 p-4'>
        <HabbitCard day={day} setDays={setDays} />
      </div>
    ));
  };

  const handleShowLess = () => {
    if (visibleData === 6) {
      return;
    }
    setVisibleData((prev) => prev - 6);
  };

  checkIfToday();

  const handleSetVisibleDays = () => {
    if (visibleData >= TotalRows * 6) {
      return;
    }
    console.log('clicked');
    setVisibleData((prev) => prev + 6);
  };

  return (
    <main className='bg-blue-500 '>
      <div>
        <Navbar />
      </div>
      <div>
        <div className='flex flex-wrap h-1/3 min-h-[500px] max-h-[500px] overflow-y-scroll'>
          {renderRows()}
        </div>
        <div className='flex justify-center'>
          <div>
            <Button
              className='m-5'
              disabled={visibleData >= TotalRows * 6 ? true : false}
              onClick={() => handleSetVisibleDays()}
            >
              Load More
            </Button>
            <Button
              disabled={visibleData <= 6 ? true : false}
              className='m-5'
              onClick={() => handleShowLess()}
            >
              Show less
            </Button>
          </div>
        </div>
      </div>

      <Graph days={days} />
    </main>
  );
}
