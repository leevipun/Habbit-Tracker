import {Day} from '@/app/models/day';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {NextRequest, NextResponse} from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const {email} = await req.json(); // Use req.body.json() to get JSON data
    await connect();
    console.log(email);
    const user = await User.findOne({email: email});
    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }
    console.log(user.days);
    const habbits = await Promise.all(
      user.days.map(async (id: string) => {
        return await Day.findById(id);
      })
    );
    console.log('habbits', habbits);
    return new NextResponse(JSON.stringify(habbits), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};
