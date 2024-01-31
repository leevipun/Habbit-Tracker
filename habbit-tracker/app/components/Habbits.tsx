import React, {useState, useEffect, use} from 'react';
import {Button} from 'antd';
import {Day, Habbit} from '../types/types';
import HabbitCard from './habbitCard';
import {v4 as uuid} from 'uuid';
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
  const [user, setUser] = useState<User | null>(null);
  const [showedDays, setShowedDays] = useState<Day[]>([]);
  const [days, setDays] = useState<Day[]>([]);
  const [visibleData, setVisibleData] = useState<number>(6);
  const TotalRows = Math.ceil(user?.days?.length ?? 0 / 6);

  const sortedDays: Day[] =
    days?.sort((a, b) => {
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
    if (session?.user?.email) {
      fetchData();
      checkToday();
    }
  }, [session?.user?.email]);

  const checkToday = () => {};

  async function handleCheckBoxChange(id: string, Dayid: string) {
    const response = await fetch('/api/habbits/updateHabbit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id, Dayid: Dayid}),
    });
    setUser(await response.json());
    return null;
  }

  const renderRows = () => {
    const visibleDays = sortedDays?.reverse().slice(0, visibleData);
    console.log('visibleDays', visibleDays);
    return visibleDays?.map((day) => (
      <div key={day.id} className='w-1/6 min-h-80 max-h-300 p-4'>
        <HabbitCard day={day} handleCheckBoxChange={handleCheckBoxChange} />
      </div>
    ));
  };

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
