import {NextRequest, NextResponse} from 'next/server';
import connect from '@/app/utils/connection';
import {Day} from '@/app/models/day';
import {Habbit, UserHabbits} from '@/app/types/types';
import {User} from '@/app/models/user';

export const revalidate = true;

export async function POST(req: NextRequest) {
  try {
    // Destructure the request body
    const {id, Dayid, email, habbitName, habbitStatus} = await req.json();

    // Connect to the database
    await connect();

    // Find the day by ID
    const day = await Day.findOne({id: Dayid});

    // Check if the day exists
    if (!day) {
      return new NextResponse('Day not found', {status: 404});
    }
    // Update the status of the specified habit
    const updatedHabits = day.habbits.map((habit: Habbit) => {
      if (habit.id === id) {
        // Toggle the status of the habit
        habit.status = !habit.status;
      }
      return habit;
    });

    const newDay = {
      habbits: updatedHabits,
    };

    // Save the updated day object
    await Day.findOneAndUpdate({id: Dayid}, newDay, {
      new: true,
    });

    const user = await User.findOne({email: email});

    if (!user) {
      return new NextResponse('User not found', {status: 404});
    }

    const updateUserHabbits = user.habits.map((habit: UserHabbits) => {
      if (habit.name === habbitName) {
        if (habbitStatus) {
          habit.done = habit.done + 1;
        } else {
          habit.done = habit.done - 1;
        }
      }
      return habit;
    });

    console.log(user.streak);

    console.log(updateUserHabbits);

    const date = new Date();
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    if (user.lastActive !== formattedDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday
        .toLocaleDateString('FI')
        .replaceAll('.', '/');

      if (user.lastActive === yesterdayFormatted) {
        await User.findOneAndUpdate(
          {email: email},
          {lastActive: formattedDate},
          {streak: user.streak + 1}
        );
      } else {
        await User.findOneAndUpdate(
          {email: email},
          {lastActive: formattedDate},
          {streak: 1}
        );
      }
    }

    await User.findOneAndUpdate({email: email}, {habits: updateUserHabbits});

    return new NextResponse('Habit updated', {status: 200});
  } catch (error) {
    console.error(error);
    // Respond with an error message
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
