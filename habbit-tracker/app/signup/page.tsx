'use client';

import {Button, Checkbox, Form, Input, Radio} from 'antd';
import React, {useState} from 'react';
import {Habbit} from '../types/types';
import {v4 as uuid} from 'uuid';
import {signUp} from '../utils/habbitFunc';
import {useRouter} from 'next/navigation';

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showHabbits, setShowHabbits] = useState<boolean>(false);
  const [numInputs, setNumInputs] = useState<number>(1);
  const [habits, setHabits] = useState<Habbit[]>([]);
  const [radioValue, setRadioValue] = useState('S');

  const onNumInputsChange = (value: number) => {
    setNumInputs(value);
  };

  const router = useRouter();

  const onFinish = async (values: any) => {
    let newHabits: Habbit[] = [];

    if (radioValue === 'S') {
      for (let i = 0; i < numInputs; i++) {
        newHabits.push({
          id: uuid(),
          name: values[`habit${i + 1}`],
          status: false,
        });
      }
    } else if (radioValue === 'R') {
      const selectedReadyMadeHabits = values['readyMadeHabits'];
      newHabits = selectedReadyMadeHabits.map((habitName: string) => ({
        id: uuid(),
        name: habitName,
        status: false,
      }));
    }

    setHabits(newHabits);
    console.log('Habits:', habits);
    console.log('Success:', values);
    const signUpData = {
      email,
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
          label={`Habit ${i + 1}`}
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
    <div>
      <h1>Sign Up</h1>

      {showHabbits ? (
        <Form
          name='dynamic-form'
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          autoComplete='off'
          onFinish={onFinish}
        >
          <Form.Item>
            <Radio.Group
              onChange={(e) => setRadioValue(e.target.value)}
              defaultValue='S'
            >
              <Radio value='S'>Make your self</Radio>
              <Radio value='R'>Choose from Ready</Radio>
            </Radio.Group>
          </Form.Item>
          {renderHabitInputs()}
          {radioValue === 'S' ? generateFormItems() : null}

          <Form.Item>
            <Button htmlType='submit'>Submit</Button>
            <Button type='default' onClick={() => setShowHabbits(false)}>
              Back
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name='dynamic-form'
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          autoComplete='off'
          onFinish={onFinish}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[{required: true, message: 'Please input your email!'}]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>
          <Button onClick={() => setShowHabbits(true)} type='default'>
            Next
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SignUpPage;
