'use client';

import {UserTypes} from '@/app/types/types';
import {LoadingOutlined} from '@ant-design/icons';
import {Spin, Button, Input} from 'antd';
import {set} from 'mongoose';
import {usePathname} from 'next/navigation';
import React, {useEffect, useState} from 'react';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserTypes | null>(null);
  const [showHabits, setShowHabits] = useState<boolean>(true);
  const [habbitName, setHabbitName] = useState<string>('');

  const pathname = usePathname();

  const id = pathname.split('/').pop();

  useEffect(() => {
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
    fetchData();
  }, []);

  const handleSave = async () => {
    console.log(habbitName);
    setShowHabits(true);
  };

  return (
    <div className='bg-[#A7D1D2] min-h-screen'>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
        fullscreen
      />
      <div>
        <h2 className='text-2xl'>Hey, {user?.username}</h2>
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
                value={habbitName}
                onChange={(e) => setHabbitName(e.target.value)}
              />
              <Button
                className='m-2 text-white bg-[#806491]'
                onClick={handleSave}
              >
                Show Habits
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
