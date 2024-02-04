'use client';

import React, {useState, useEffect} from 'react';
import {Button, Modal, Select, Spin} from 'antd';
import {Day, Habbit} from './types/types';
import HabbitCard from './components/habbitCard';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import Graph from './components/graph';
import HabbitGraph from './components/habbitGraph';
import {UserHabbits} from '@/app/types/types';
import Navbar from './components/Navbar';
import {LoadingOutlined} from '@ant-design/icons';

const Habbits = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [habbits, setHabbits] = useState<UserHabbits[]>([]);
  const [showedDays, setShowedDays] = useState<Day[]>([]);
  const [days, setDays] = useState<Day[] | undefined>([]);
  const [visibleData, setVisibleData] = useState<number>(6);
  const TotalRows = Math.ceil(days?.length ?? 0 / 6);

  const handleNewDay = async () => {
    setLoading(true);
    try {
      console.log(email);
      await fetch('/api/habbits/addNewDay', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(email),
      });
      const response = await fetch('/api/habbits/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: session?.user?.email}),
      });
      const data = await response.json();
      setDays(data);
      Modal.destroyAll();
    } catch (error) {
      console.error('Error adding new day:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    Modal.destroyAll();
  };

  useEffect(() => {
    const checkToday = () => {
      setLoading(true);
      const currentDate = new Date().toLocaleDateString().replaceAll('.', '/');
      const isToday = days?.map((day) => day.date.includes(currentDate));
      if (!session || days === undefined) {
        console.log('No session');
        return;
      }
      if (isToday?.includes(true)) {
        console.log('Today already added');
        return;
      } else {
        try {
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
        } catch (error) {
          console.error('Error displaying modal:', error);
        } finally {
          setLoading(false);
        }
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
      setLoading(true);
      try {
        const response = await fetch('/api/habbits/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: session?.user?.email}),
        });
        const data = await response.json();
        if (data.length === 0) {
          setDays([]);
        }
        console.log(data);
        setDays(data);
        setEmail(session?.user?.email);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserHabbits = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching user habits:', error);
      } finally {
        setLoading(false);
      }
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
    setLoading(true);
    try {
      if (days === undefined) {
        return;
      }
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
    } finally {
      setLoading(false);
    }
  }

  const renderRows = () => {
    console.log(days);
    if (days === undefined) {
      return (
        <div className='flex justify-center items-center w-full h-80'>
          No Habbits to display
        </div>
      );
    } else {
      const visibleDays = days?.slice(0, visibleData).reverse();
      return visibleDays?.map((day) => (
        <div key={day.id} className='w-1/5 min-w-1/5 min-h-80 max-h-300 p-4 '>
          <HabbitCard day={day} handleCheckBoxChange={handleCheckBoxChange} />
        </div>
      ));
    }
  };

  const thisYear = new Date().getFullYear();

  const selectOptions = [
    {label: 'Last year', value: 'lastYear'},
    {label: 'This year', value: 'thisYear'},
    {label: `January ${thisYear}`, value: 1},
    {label: `February ${thisYear}`, value: 2},
    {label: `March ${thisYear}`, value: 3},
    {label: `April ${thisYear}`, value: 4},
    {label: `May ${thisYear}`, value: 5},
    {label: `June ${thisYear}`, value: 6},
    {label: `July ${thisYear}`, value: 7},
    {label: `August ${thisYear}`, value: 8},
    {label: `September ${thisYear}`, value: 9},
    {label: `October ${thisYear}`, value: 10},
    {label: `November ${thisYear}`, value: 11},
    {label: `December ${thisYear}`, value: 12},
  ];

  const handleNewRender = async (value: string | number) => {
    try {
      const response = await fetch('/api/habbits/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: session?.user?.email, value: value}),
      });
      if (response.status === 200) {
        const days = await response.json();
        setDays(days);
      } else {
        setDays(undefined);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='bg-[#63898C] min-h-screen'>
      <Navbar user={user} />
      <div className='align-center justify-center flex'>
        <Select
          className='w-1/6'
          defaultValue={'thisYear'}
          onChange={(value) => handleNewRender(value)}
          dropdownStyle={{backgroundColor: '#A7D1D2'}}
          options={selectOptions}
        />
      </div>
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
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
      />
    </div>
  );
};

export default Habbits;
