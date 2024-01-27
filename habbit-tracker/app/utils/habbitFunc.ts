import {NextResponse} from 'next/server';
import {Habbit} from '../types/types';

interface SignUp {
  email: string;
  password: string;
  habits: Habbit[];
}

interface getData {
  email: string;
}

export async function signUp(data: SignUp) {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(response);
    return new NextResponse(`New User Added succesfully ${response}`, {
      status: 200,
    });
  } catch (error) {
    new NextResponse('User creation failed', {status: 400});
  }
}

export async function getHabbits(data: getData) {
  try {
    const response = await fetch('/api/habbits', {
      method: 'GET',
      body: JSON.stringify(data),
    });
    const habbits = await response.json();
    console.log(habbits);
    return data;
  } catch (error) {
    console.error(error);
  }
}
