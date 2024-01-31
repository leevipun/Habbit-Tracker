'use client';

import React, {useState} from 'react';
import {Checkbox, Input, Button} from 'antd';
import {Day} from '../types/types';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {User} from '@/app/models/user';

interface HabbitCardProps {
  day: Day;
  handleCheckBoxChange: (id: string, dayId: string) => void;
}

const HabbitCard = ({day, handleCheckBoxChange}: HabbitCardProps) => {
  const [habbitName, setHabbitName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>();
  const [editPast, setEditPast] = useState<boolean>(false);
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  console.log(day);

  const mappedHabbits = day.habbits.map((habit) => {
    console.log(habit);
  });

  mappedHabbits;

  const handleEdit = (id: string) => {
    setEditId(id);
    setEdit(true);
  };

  const handleCancel = () => {
    setEditId(undefined);
    setEdit(false);
  };

  const handleSave = () => {
    console.log('save');
  };

  return (
    <div>
      <div
        key={day.id}
        className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <p>{day.date}</p>
        {edit && day.id?.toString() === editId?.toString() ? (
          <div>
            <Input
              value={habbitName}
              onChange={(e) => setHabbitName(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        ) : (
          <div>
            {day.habbits.map((habit) => (
              <div key={habit.name}>
                <Checkbox
                  disabled={day.date !== today ? !editPast : false}
                  checked={habit.status}
                  onChange={() => handleCheckBoxChange(habit.id, day.id)}
                >
                  {habit.name}
                </Checkbox>
              </div>
            ))}
          </div>
        )}
        {!edit && day.date !== today ? (
          editPast ? (
            <Button onClick={() => setEditPast(false)}>Save</Button>
          ) : (
            <Button onClick={() => setEditPast(true)}>Edit</Button>
          )
        ) : null}
        {day.date === today && !edit ? (
          <Button onClick={() => handleEdit(day.id)} type='dashed'>
            Add new Habbit
          </Button>
        ) : null}
        <div>
          {`Percentage of completed habbits: ${(
            (day.habbits.filter((h) => h.status).length / day.habbits.length) *
            100
          ).toFixed(1)} `}
        </div>
      </div>
    </div>
  );
};

export default HabbitCard;
