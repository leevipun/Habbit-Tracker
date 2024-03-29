'use client';

import React, {useState} from 'react';
import {Button, Form, Input, Spin} from 'antd';
import {signIn} from 'next-auth/react';
import {LoadingOutlined} from '@ant-design/icons';

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onFinish = async () => {
    setLoading(true);
    try {
      await addNewDay();
      const response = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNewDay = async () => {
    const response = await fetch('/api/habbits/addNewDay', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(email),
    });
  };

  const handleNewAccount = () => {
    window.location.href = '/signup';
  };

  return (
    <div className='flex justify-center items-center bg-[#63898C] min-h-screen'>
      <div className='w-full sm:w-1/3 p-8'>
        <h1 className='text-4xl font-bold mb-8'>Log In</h1>

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
          <Form.Item className='justify-space'>
            <Button htmlType='submit' className='mr-4'>
              Sign In
            </Button>
            <Button onClick={() => handleNewAccount()}>
              Create an account
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
        fullscreen
      />
    </div>
  );
}
