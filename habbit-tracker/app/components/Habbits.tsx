import React, {useState, useEffect} from 'react';
import {Button, Modal} from 'antd';
import {Day, Habbit} from '../types/types';
import HabbitCard from './habbitCard';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Graph from './graph';
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

  const handleNewDay = async () => {
    try {
      await fetch('/api/habbits/addNewDay', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: session?.user?.email}),
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
            // Toggle the status of the habit
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
        <Graph days={days} />
      </div>
    </div>
  );
};

export default Habbits;
