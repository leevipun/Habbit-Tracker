'use client';

import React, {useState} from 'react';
import {Checkbox, Input, Button, Modal} from 'antd';
import {Day} from '../types/types';
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';

interface HabbitCardProps {
  day: Day;
  handleCheckBoxChange: (
    id: string,
    dayId: string,
    updateHabbitName: string
  ) => void;
}

const HabbitCard = ({day, handleCheckBoxChange}: HabbitCardProps) => {
  const [habbitName, setHabbitName] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>();
  const [showmodal, setShowModal] = useState<boolean>(false);
  const [editPast, setEditPast] = useState<boolean>(false);
  const [addToEveryday, setAddToEveryday] = useState<boolean>(false);
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });

  const handleModalCancel = () => {
    setHabbitName('');
    setAddToEveryday(false);
    setEdit(false);
    setEditId(undefined);
    setShowModal(false);
  };

  const saveNew = async (dayId: string) => {
    try {
      console.log(editId, habbitName, addToEveryday, session?.user?.email);
      await fetch('/api/habbits/addNewHabbit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          Dayid: dayId,
          email: session?.user?.email,
          name: habbitName,
          addToEveryday: addToEveryday,
        }),
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const modal = (dayId: string) => {
    setShowModal(true);
  };

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
        className='shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-[#A7D1D2] text-[#033540]'
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
                  className='text-[#033540] mb-2'
                  checked={habit.status}
                  onChange={() =>
                    handleCheckBoxChange(habit.id, day.id, habit.name)
                  }
                >
                  {habit.name}
                </Checkbox>
              </div>
            ))}
          </div>
        )}
        {day.date === today && !edit ? (
          <Button onClick={() => modal(day.id)} type='dashed'>
            Add new Habbit
          </Button>
        ) : null}
        <div>
          Completion percentage is{' '}
          {(
            (day.habbits.filter((h) => h.status).length / day.habbits.length) *
            100
          ).toFixed(1)}
          %
        </div>

        <Modal
          title='Add new Habbit'
          open={showmodal}
          onCancel={() => handleModalCancel()}
          footer={null}
        >
          <div>
            <label htmlFor='habbitName'>Habbit Name</label>
            <Input
              id='habbitName'
              value={habbitName}
              onChange={(e) => setHabbitName(e.target.value)}
            />
            <Checkbox
              defaultChecked={addToEveryday}
              onChange={(e) => setAddToEveryday(e.target.checked)}
            >
              Add to everyday
            </Checkbox>
          </div>
          <div>
            <Button onClick={() => handleModalCancel()}>Cancel</Button>
            <Button onClick={() => saveNew(day.id)}>Save</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HabbitCard;
