'use client';

import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import {signIn} from 'next-auth/react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      await fetch('/api/habbits/addNewDay', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email}),
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
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
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
