'use client';

import React, {useState} from 'react';
import {Checkbox, Input, Button} from 'antd';
import {Day} from '../types/types';

interface HabbitCardProps {
  day: Day;
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
}

const HabbitCard: React.FC<HabbitCardProps> = ({day, setDays}) => {
  const [habbitName, setHabbitName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>();
  const [editPast, setEditPast] = useState<boolean>(false);
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const handleEdit = (id: string) => {
    setEditId(id);
    setEdit(true);
  };

  const handleCancel = () => {
    setEditId(undefined);
    setEdit(false);
  };

  const handleEditHabbit = () => {
    const updateHabitStatus = (
      dayId: string,
      habitId: string,
      newStatus: boolean
    ) => {
      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id.toString() === dayId.toString()
            ? {
                ...day,
                habbits: day.habbits.map((habit) =>
                  habit.id.toString() === habitId.toString()
                    ? {...habit, status: newStatus}
                    : habit
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
          <p>{day.date}</p>
          {edit && day.id?.toString() === editId?.toString() ? (
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
                <div key={habit.name}>
                  <Checkbox
                    disabled={day.date !== today ? !editPast : false}
                    checked={habit.status}
                    onChange={(e) =>
                      updateHabitStatus(
                        day.id.toString(),
                        habit.id,
                        e.target.checked
                      )
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
          ) : null}
          {day.date === today && !edit ? (
            <Button onClick={() => handleEdit(day.id)} type='dashed'>
              Add new Habbit
            </Button>
          ) : null}
          <div>
            {`Percentage of completed habbits: ${(
              (day.habbits.filter((h) => h.status).length /
                day.habbits.length) *
              100
            ).toFixed(1)} `}
          </div>
        </div>
      </div>
    );
  };
};

export default HabbitCard;
