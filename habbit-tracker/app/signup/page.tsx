'use client';

import {Button, Checkbox, Form, Input, Radio} from 'antd';
import React, {useState} from 'react';
import {UserHabbits} from '../types/types';
import {v4 as uuid} from 'uuid';
import {signUp} from '../utils/habbitFunc';
import {useRouter} from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [showHabbits, setShowHabbits] = useState<boolean>(false);
  const [numInputs, setNumInputs] = useState<number>(1);
  const [habits, setHabits] = useState<UserHabbits[]>([]);
  const [radioValue, setRadioValue] = useState('S');

  const onNumInputsChange = (value: number) => {
    setNumInputs(value);
  };

  const router = useRouter();

  const currentDate = new Date();

  const currentDayOfYear = Math.ceil(
    (currentDate.getTime() -
      new Date(currentDate.getFullYear(), 0, 1).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const daysRemaining = 365 - currentDayOfYear;

  console.log('Days remaining:', daysRemaining);

  const onFinish = async (values: any) => {
    let newHabits: UserHabbits[] = [];

    if (radioValue === 'S') {
      for (let i = 0; i < numInputs; i++) {
        newHabits.push({
          id: uuid(),
          name: values[`habit${i + 1}`],
          done: 0,
        });
      }
    } else if (radioValue === 'R') {
      const selectedReadyMadeHabits = values['readyMadeHabits'];
      newHabits = selectedReadyMadeHabits.map((habitName: string) => ({
        id: uuid(),
        name: habitName,
        done: 0,
      }));
    }

    setHabits(newHabits);
    const signUpData = {
      email,
      username,
      password,
      habits: newHabits,
    };
    try {
      const response = await signUp(signUpData);
      console.log(response);
      if (!response || !response.ok) throw new Error('Something went wrong');

      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateFormItems = () => {
    const items = [];
    if (numInputs > 10) setNumInputs(10);
    for (let i = 0; i < numInputs; i++) {
      items.push(
        <Form.Item
          key={`habit${i + 1}`}
          label={`Habbit`}
          name={`habit${i + 1}`}
          rules={[{required: true, message: 'Please input the habit!'}]}
        >
          <Input />
        </Form.Item>
      );
    }
    return items;
  };

  const renderHabitInputs = () => {
    if (radioValue === 'S') {
      return (
        <Form.Item
          label='Number of Habits'
          name='numHabits'
          initialValue={1}
          rules={[
            {required: true, message: 'Please input the number of habits!'},
          ]}
        >
          <Input
            type='number'
            min={1}
            max={10}
            onChange={(e) => onNumInputsChange(Number(e.target.value))}
          />
        </Form.Item>
      );
    } else if (radioValue === 'R') {
      const readyMadeHabits = [
        'Read a book',
        'Exercise',
        'Meditate',
        'Learn a new skill',
        'Drink enough water',
        'Practice gratitude',
        'Get enough sleep',
        'Take a walk',
        'Eat a balanced meal',
        'Journal your thoughts',
      ];
      return (
        <Form.Item
          label='Ready-made Habits'
          name='readyMadeHabits'
          initialValue={[]}
          rules={[
            {required: true, message: 'Please select at least one habit!'},
          ]}
        >
          <Checkbox.Group options={readyMadeHabits} />
        </Form.Item>
      );
    }
  };

  return (
    <div className='flex justify-center items-center bg-[#63898C] min-h-screen'>
      <div className='w-full sm:w-1/3 p-8'>
        <h1 className='text-4xl font-bold mb-8'>Sign Up</h1>

        {showHabbits ? (
          <Form
            name='dynamic-form'
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            autoComplete='off'
            onFinish={onFinish}
            className='bg-[#A7D1D2] text-[#033540] backdrop-blur  shadow-md rounded px-8 pt-6 pb-8 mb-8'
          >
            <Form.Item>
              <Radio.Group
                onChange={(e) => setRadioValue(e.target.value)}
                defaultValue='S'
                className='mb-4'
              >
                <Radio value='S'>Make yourself</Radio>
                <Radio value='R'>Choose from Ready</Radio>
              </Radio.Group>
            </Form.Item>
            {renderHabitInputs()}
            {radioValue === 'S' ? generateFormItems() : null}

            <Form.Item className='mt-8'>
              <Button htmlType='submit' className='mr-4'>
                Submit
              </Button>
              <Button onClick={() => setShowHabbits(false)}>Back</Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            name='dynamic-form'
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            autoComplete='on'
            onFinish={onFinish}
            className='bg-[#A7D1D2] text-[#033540] backdrop-blur  shadow-md rounded px-8 pt-6 pb-8 mb-8'
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[{required: true, message: 'Please input your email!'}]}
              className='mb-4'
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='w-full px-3 py-2 border rounded'
              />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[{required: true, message: 'Please input your username!'}]}
              className='mb-4'
            >
              <Input
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                className='w-full px-3 py-2 border rounded'
              />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{required: true, message: 'Please input your password!'}]}
              className='mb-4'
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='w-full px-3 py-2 border rounded'
              />
            </Form.Item>
            <Button onClick={() => setShowHabbits(true)} className='w-full'>
              Next
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
