import {Day} from '@/app/models/day';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {NextRequest, NextResponse} from 'next/server';
import {v4 as uuid} from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const {Dayid, email, name, addToEveryday} = await req.json();
    console.log(Dayid, email, name, addToEveryday);
    await connect();

    const newUserHabbit = {
      name: name,
      done: 0,
    };

    const user = await User.findOne({email: email});

    if (addToEveryday) {
      await User.findOneAndUpdate(
        {email: email},
        {$push: {habits: newUserHabbit}}
      );
      if (!user.days)
        return new NextResponse(JSON.stringify(user), {status: 200});
      await Promise.all(
        user.days.map(async (id: string) => {
          return await Day.findByIdAndUpdate(id, {
            $push: {habbits: {id: uuid(), name: name, status: false}},
          });
        })
      );
    }

    if (!addToEveryday) {
      await Day.findOneAndUpdate(
        {id: Dayid},
        {$push: {habbits: {id: uuid(), name: name, status: false}}}
      );
    }

    console.log(user);

    return new NextResponse(JSON.stringify(user), {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Habbit adding failed', {status: 500});
  }
}
