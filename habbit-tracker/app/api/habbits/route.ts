import {Day} from '@/app/models/habbit';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {revalidatePath} from 'next/cache';
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
    console.log(user);
    return new NextResponse(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const {email, day} = await req.json(); // Use req.body.json() to get JSON data
    await connect();
    console.log(email);
    const editedDay = new Day({
      id: day.id,
      date: day.date,
      habbits: day.habbits,
    });
    const user = await User.findOneAndUpdate(
      {email: email, 'days.id': day.id},
      {$pull: {days: {id: day.id}}, $push: {days: editedDay}},
      {new: true}
    );
    revalidatePath('/');
    return new NextResponse(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};
