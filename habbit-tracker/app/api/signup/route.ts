import connect from '@/app/utils/connection';
import bcrypt from 'bcrypt';
import {User} from '@/app/models/user';
import {NextRequest, NextResponse} from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const {email, username, password, habits} = await req.json();
    console.log(email, password, habits);

    await connect();

    const passwordHash = await bcrypt.hash(password, 15);

    const existingUser = await User.findOne({
      $or: [{email: email}, {username: username}],
    });

    if (existingUser) {
      console.log('User already exists');
      return new NextResponse('User already exists', {status: 400});
    }
    if (!existingUser) {
      console.log('Creating new user');
      const newUser = new User({
        email: email,
        username: username,
        passwordHash: passwordHash,
        created: new Date().toLocaleDateString().replaceAll('.', '/'),
        habits: habits,
        streak: 1,
      });

      await newUser.save();
      console.log(newUser);

      return new NextResponse('New User Added successfully', {
        status: 200,
      });
    }
  } catch (error: any) {
    console.error('Error during user creation:', error.message);
    return new NextResponse('Error during user creation', {status: 500});
  }
};
