'use client';

import React, {useState, useEffect} from 'react';
import {Button, Modal, Spin} from 'antd';
import {Day, Habbit} from './types/types';
import HabbitCard from './components/habbitCard';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Graph from './components/graph';
import HabbitGraph from './components/habbitGraph';
import {UserHabbits} from '@/app/types/types';
import Navbar from './components/Navbar';
import {set} from 'mongoose';

interface User {
  _id: string;
  email: string;
  passwordHash: string;
  habits: Array<any>;
  days: Day[];
}

const Habbits = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });
  const [firstHasRun, setFirstHasRun] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [habbits, setHabbits] = useState<UserHabbits[]>([]);
  const [showedDays, setShowedDays] = useState<Day[]>([]);
  const [days, setDays] = useState<Day[]>([]);
  const [visibleData, setVisibleData] = useState<number>(6);
  const TotalRows = Math.ceil(days?.length ?? 0 / 6);

  const handleNewDay = async () => {
    try {
      await fetch('/api/habbits/addNewDay', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(session?.user?.email),
      });
      const response = await fetch('/api/habbits/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: session?.user?.email}),
      });
      const data = await response.json();
      setDays(data.reverce());
      Modal.destroyAll();
    } catch (error) {
      console.error('Error adding new day:', error);
    }
  };

  const handleModalCancel = () => {
    Modal.destroyAll();
  };

  useEffect(() => {
    const checkToday = () => {
      console.log('täällä');
      console.log(days);
      const currentDate = new Date().toLocaleDateString().replaceAll('.', '/');
      if (days?.map((day) => day.date.toString().includes(currentDate))) {
        return;
      } else {
        Modal.info({
          title: 'Add new day',
          footer: null,
          content: (
            <div>
              <p>It seems you haven&apost added a new day yet.</p>
              <p>Click the button below to add a new day</p>
              <div>
                <Button onClick={handleNewDay}>Add new day</Button>
                <Button onClick={handleModalCancel}>Cancel</Button>
              </div>
            </div>
          ),
        });
      }
    };
    checkToday();
  }, [days]);

  const handleShowLess = () => {
    if (visibleData === 6) {
      return;
    }
    setVisibleData((prev) => prev - 6);
  };

  const handleSetVisibleDays = () => {
    if (visibleData >= TotalRows * 6) {
      return;
    }
    console.log('clicked');
    setVisibleData((prev) => prev + 6);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/habbits/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: session?.user?.email}),
      });
      const data = await response.json();
      console.log(data);
      setDays(data);
    };
    const fetchUserHabbits = async () => {
      const response = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: session?.user?.email}),
      });
      const data = await response.json();
      setUser(data);
      setHabbits(data.habits);
    };
    fetchUserHabbits();

    if (session?.user?.email) {
      fetchData();
    }
  }, [session?.user?.email]);

  async function handleCheckBoxChange(
    id: string,
    Dayid: string,
    updateHabbitName: string
  ) {
    try {
      const updatedHabits = days.map((day: Day) => {
        const updatedHabits = day.habbits.map((habit: Habbit) => {
          if (habit.id === id) {
            habit.status = !habit.status;
          }
          return habit;
        });
        return {...day, habits: updatedHabits};
      });

      const habbitstatus = updatedHabits
        .find((day) => day.id === Dayid)
        ?.habbits.find((habbit) => habbit.id === id)?.status;

      await fetch('/api/habbits/updateHabbit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          Dayid: Dayid,
          email: session?.user?.email,
          habbitName: updateHabbitName,
          habbitStatus: habbitstatus,
        }),
      });

      const updatedGraphData = habbits.map((habbit) => {
        if (habbit.name === updateHabbitName) {
          if (habbitstatus) {
            habbit.done = habbit.done + 1;
          } else {
            habbit.done = habbit.done - 1;
          }
        }
        return habbit;
      });

      setHabbits(updatedGraphData);
      setDays(updatedHabits);

      return null;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const renderRows = () => {
    const visibleDays = days?.slice(0, visibleData).reverse();
    return visibleDays?.map((day) => (
      <div key={day.id} className='w-1/5 min-w-1/5 min-h-80 max-h-300 p-4'>
        <HabbitCard day={day} handleCheckBoxChange={handleCheckBoxChange} />
      </div>
    ));
  };

  return (
    <div>
      <Navbar user={user} />
      <div className='flex'>
        <div className='w-2/3'>
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
          <Graph days={days} />
        </div>
        <div className='w-1/3'>
          <HabbitGraph user={habbits} />
        </div>
      </div>
      <Spin spinning={loading} />
    </div>
  );
};

export default Habbits;
