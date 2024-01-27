import {NextRequest, NextResponse} from 'next/server';
import {Day} from '@/app/models/habbit';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {revalidatePath} from 'next/cache';

interface DayData {
  id: string;
  date: string;
  habbits: string[];
}

export const POST = async (req: NextRequest) => {
  try {
    const {email, day} = await req.json(); // Use req.body.json() to get JSON data
    await connect();
    console.log(email);
    const user = await User.findOne({email: email});
    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }
    const today = new Date();
    const todayFormatted = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    const isTodayAlreadyAdded = user?.days?.some(
      (day: DayData) => day.date === todayFormatted
    );

    if (isTodayAlreadyAdded) {
      return new NextResponse('Day already added', {status: 400});
    }
    const NewDay = new Day({
      id: day.id,
      date: day.date,
      habbits: day.habbits,
    });
    user.days.push(NewDay);
    await user.save();
    revalidatePath('/');
    return new NextResponse(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};
