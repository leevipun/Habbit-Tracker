import {NextRequest, NextResponse} from 'next/server';
import {Day} from '@/app/models/day';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {v4 as uuid} from 'uuid';
import {Habbit} from '@/app/types/types';
import {Month} from '@/app/models/moths';
import {Year} from '@/app/models/year';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const email = body.toString();
    console.log(email);
    await connect();
    const user = await User.findOne({email: email});
    if (!user) {
      console.log('User not found');
      return new NextResponse('User not found', {status: 404});
    }

    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const day = await Day.findOne({date: formattedDate, user: email});
    if (day) {
      console.log('day is yes');
      return new NextResponse('Day already exists', {status: 409});
    }
    const currentMonth = `${date.getMonth() + 1}/${date.getFullYear()}`;
    const currentYear = `${date.getFullYear()}`;

    const month = await Month.findOne({months: currentMonth, user: email});
    const year = await Month.findOne({months: currentYear, user: email});

    console.log(month, year);

    if (!year) {
      const newYear = new Year({
        year: currentYear,
        user: email,
      });
      const savedYear = await newYear.save();
      user.years = user.years.concat(savedYear._id);
      await user.save();
      if (!month) {
        const newMonth = new Month({
          months: currentMonth,
          user: email,
        });
        const savedMonth = await newMonth.save();
        user.months = user.months.concat(savedMonth._id);
        await user.save();
        await Year.updateOne(
          {year: currentYear, user: email},
          {$push: {months: savedMonth._id}}
        );
      }
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

    console.log(savedDay);

    await user.save();

    await Month.updateOne(
      {months: currentMonth, user: email},
      {$push: {days: savedDay._id}}
    );
    await Year.updateOne(
      {year: currentYear, user: email},
      {$push: {days: savedDay._id}}
    );

    return new NextResponse('Day added', {status: 200});
  } catch (error) {
    console.error(error);
    return new NextResponse('Day fetching failed', {status: 500});
  }
};
