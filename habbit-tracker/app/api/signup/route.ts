import connect from '@/app/utils/connection';
import bcrypt from 'bcrypt';
import {User} from '@/app/models/user';
import {NextRequest, NextResponse} from 'next/server';

export const POST = async (req: NextRequest) => {
  const {email, password, habits} = await req.json();
  console.log(email, password, habits);
  await connect();
  const passwordHash = await bcrypt.hash(password, 15);
  const newUser = new User({
    email: email,
    passwordHash: passwordHash,
    habits: habits,
  });
  try {
    await newUser.save();
    console.log(newUser);
    return new NextResponse('New User Added succesfully', {
      status: 200,
    });
  } catch (error) {
    return new NextResponse('User creation failed', {});
  }
};
