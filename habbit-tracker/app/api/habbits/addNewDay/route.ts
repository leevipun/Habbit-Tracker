import {NextRequest, NextResponse} from 'next/server';
import {Day} from '@/app/models/day';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {v4 as uuid} from 'uuid';
import {Habbit} from '@/app/types/types';

export const POST = async (req: NextRequest) => {
  try {
    const {email} = await req.json();
    await connect();
    const user = await User.findOne({email: email});
    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const day = await Day.findOne({date: formattedDate, user: email});
    if (day) {
      return new NextResponse('Day already exists', {status: 409});
    }

    const Newday = new Day({
      id: uuid(),
      user: email,
      date: formattedDate,
      habbits: user.habits.map((habit: Habbit) => {
        return {
          id: uuid(),
          name: habit.name,
          status: false,
        };
      }),
    });
    const savedDay = await Newday.save();

    user.days = user.days.concat(savedDay._id);

    console.log(user);

    await user.save();

    return new NextResponse('Day added', {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};
