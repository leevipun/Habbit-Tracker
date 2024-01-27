import React, {useState, useEffect} from 'react';
import {Button} from 'antd';
import {Day, Habbit} from '../types/types';
import HabbitCard from './habbitCard';
import uuid from 'react-uuid';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
type User = {
  _id: string;
  email: string;
  passwordHash: string;
  habits: Array<any>;
  days: Day[];
};

const Habbits = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });
  const email = session?.user?.email;
  const [user, setUser] = useState<User | null>(null);
  const [showedDays, setShowedDays] = useState<Day[]>([]);
  const [days, setDays] = useState<Day[]>([]);
  const [visibleData, setVisibleData] = useState<number>(6);
  const TotalRows = Math.ceil(user?.days?.length ?? 0 / 6);

  const checkIfToday = () => {};

  const sortedDays: Day[] =
    user?.days?.sort((a, b) => {
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
    }) || [];

  const renderRows = () => {
    const visibleDays = sortedDays?.reverse().slice(0, visibleData);
    return visibleDays?.map((day) => (
      <div key={day.id} className='w-1/6 min-h-80 max-h-300 p-4'>
        <HabbitCard day={day} setDays={setShowedDays} />
      </div>
    ));
  };

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

  const fetchData = async () => {
    try {
      const sentEmail = session?.user?.email;
      console.log(sentEmail);

      const response = await fetch('/api/habbits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: sentEmail}),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('user', user);
        setDays(user.days);
        setUser(user);
        const today = new Date();
        const todayFormatted = `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()}`;
        const isTodayAlreadyAdded = user?.days?.some(
          (day: Day) => day.date === todayFormatted
        );
        if (!isTodayAlreadyAdded) {
          const newDay: Day = {
            id: uuid(),
            date: todayFormatted,
            habbits:
              user?.habits?.map((habit: Habbit) => ({
                id: habit.id,
                name: habit.name,
                status: false,
              })) || [],
          };
          fetch('/api/habbits/addNewDay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: sentEmail, day: newDay}),
          });
        }
      } else {
        console.error('Failed to fetch days');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
      checkIfToday();
      console.log('user', user);
    } else {
      console.log('No session');
    }
  }, [session]);

  return (
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
  );
};

export default Habbits;
