'use client';

import Navbar from '@/app/components/Navbar';
import {UserTypes} from '@/app/types/types';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin, Button, Input} from 'antd';
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserTypes | null>(null);
  const [showHabits, setShowHabits] = useState<boolean>(true);
  const [habbitName, setHabbitName] = useState<string>('');

  const pathname = usePathname();
  const data = user?.habits.map((goal) => ({
    name: goal.name,
    completionPercentage: ((40 / 365) * 100).toFixed(0),
  }));

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNewHabbit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/habbits/addNewHabbit`, {
        method: 'POST',
        body: JSON.stringify({
          name: habbitName,
          addToEveryday: true,
          email: user?.email,
        }),
      });
      if (response.ok) {
        await fetchData();
        setHabbitName('');
        setShowHabits(true);
      }
    } catch (error) {
      console.error('Error saving new habbit:', error);
    } finally {
      setLoading(false);
    }
  };

  const id = pathname.split('/').pop();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='bg-[#A7D1D2] min-h-screen'>
      <Navbar user={user} />
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
        fullscreen
      />
      <div>
        <h2 className='text-2xl'>Hey, {user?.username}</h2>
        <h3 className='text-xl'>Welcome to your page</h3>
        <div className='bg-[#63898C] text-white shadow-lg rounded-lg p-4 mx-4 my-6 w-1/3'>
          <p className='font-bold'>Congratulations!</p>
          <p className='text-lg'>
            You&#39;ve achieved a {user?.streak} day streak!
          </p>
        </div>
        <div className='bg-[#63898C] text-white shadow-lg p-2 rounded m-4 w-1/3'>
          {showHabits ? (
            <>
              <h3 className='text-xl'>Your Habits</h3>
              <ul>
                {user?.habits.map((habit) => (
                  <li key={habit.id}>
                    {habit.name}
                    <Button className='m-2 text-white bg-[#806491]'>
                      Edit
                    </Button>
                    <Button className='text-white bg-[#B9848C]'>Delete</Button>
                  </li>
                ))}
              </ul>
              <Button
                className='m-2 text-white bg-[#806491]'
                onClick={() => setShowHabits(false)}
              >
                Add new habbit
              </Button>
            </>
          ) : (
            <div>
              <label>Name: </label>
              <Input
                className='mr-2'
                value={habbitName}
                onChange={(e) => setHabbitName(e.target.value)}
              />
              <Button
                className='m-2 text-white bg-[#806491]'
                onClick={saveNewHabbit}
              >
                Save new habbit
              </Button>
            </div>
          )}
        </div>
        <div className='bg-[#63898C] text-white shadow-lg p-4 rounded-lg m-4 w-1/3'>
          {user?.habits.map((goal) => (
            <ul key={goal.id}>
              <li className='text-sm' key={goal.id}>
                You have completed habit {goal.name} {goal.done} times, which is{' '}
                {((goal.done / 365) * 100).toFixed(0)}% of the year
              </li>
            </ul>
          ))}
          <div className='mt-4'>
            <ResponsiveContainer width='100%' height={400}>
              <BarChart data={data}>
                <CartesianGrid stroke='#B9848C' />
                <XAxis dataKey='name' tick={{fontSize: 12}} stroke='#B9848C' />
                <YAxis tick={{fontSize: 12}} stroke='#B9848C' />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Legend stroke='#B9848C' />
                <Bar
                  dataKey='completionPercentage'
                  fill='#B9848C'
                  barSize={80}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
