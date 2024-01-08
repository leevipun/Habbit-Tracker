'use client';

import React, {useState} from 'react';
import {Checkbox, Input, Button} from 'antd';
import {Day} from '../types/types';
import {set} from 'mongoose';

interface HabbitCardProps {
  day: Day;
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
}

const HabbitCard: React.FC<HabbitCardProps> = ({day, setDays}) => {
  const [habbitName, setHabbitName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>();
  const [editPast, setEditPast] = useState<boolean>(false);
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const handleEdit = (id: number) => {
    setEditId(id);
    setEdit(true);
  };

  const handleCancel = () => {
    setEditId(undefined);
    setEdit(false);
  };

  const handleEditHabbit = () => {
    // Assuming day is the current day object from your state
    const updatedHabits = [
      ...day.habbits,
      {id: day.habbits.length + 1, name: habbitName, status: false},
    ];

    // Assuming you have a setDays function to update the state
    setDays((prevDays) =>
      prevDays.map((d) =>
        d.id === day.id ? {...d, habbits: updatedHabits} : d
      )
    );

    setEditId(undefined);
    setEdit(false);
  };

  const updateHabitStatus = (
    dayId: number,
    habitId: number,
    newStatus: boolean
  ) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === dayId
          ? {
              ...day,
              habbits: day.habbits.map((habit) =>
                habit.id === habitId ? {...habit, status: newStatus} : habit
              ),
            }
          : day
      )
    );
  };

  const checkIfToday = () => {};

  return (
    <div>
      <div
        key={day.id}
        className=' bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        {edit && day.id === editId ? (
          <div>
            <Input
              value={habbitName}
              onChange={(e) => setHabbitName(e.target.value)}
            />
            <Button onClick={() => handleEditHabbit()}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        ) : (
          <div>
            {day.habbits.map((habit) => (
              <div key={habit.id}>
                <Checkbox
                  disabled={day.date !== today ? !editPast : false}
                  checked={habit.status}
                  onChange={(e) =>
                    updateHabitStatus(day.id, habit.id, e.target.checked)
                  }
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
        ) : (
          <Button>Save</Button>
        )}
        {day.date === today && !edit ? (
          <Button
            onClick={() => handleEdit(day.id)}
            className='ml-5'
            type='dashed'
          >
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
