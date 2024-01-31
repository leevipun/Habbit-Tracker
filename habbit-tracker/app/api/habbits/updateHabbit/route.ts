import {NextRequest, NextResponse} from 'next/server';
import connect from '@/app/utils/connection';
import {Day} from '@/app/models/day';
import {Habbit} from '@/app/types/types';

export const revalidate = true;

export async function POST(req: NextRequest) {
  try {
    // Destructure the request body
    const {id, Dayid} = await req.json();

    // Connect to the database
    await connect();

    // Find the day by ID
    const day = await Day.findOne({id: Dayid});

    // Check if the day exists
    if (!day) {
      return new NextResponse('Day not found', {status: 404});
    }

    console.log(id, Dayid);

    // Update the status of the specified habit
    const updatedHabits = day.habbits.map((habit: Habbit) => {
      if (habit.id === id) {
        // Toggle the status of the habit
        habit.status = !habit.status;
      }
      return habit;
    });

    console.log(updatedHabits);

    const newDay = {
      habbits: updatedHabits,
    };

    // Save the updated day object
    const updatedDay = await Day.findOneAndUpdate({id: Dayid}, newDay, {
      new: true,
    });

    console.log(updatedDay);

    // Respond with a success message
    return new NextResponse('Habit updated', {status: 200});
  } catch (error) {
    console.error(error);
    // Respond with an error message
    return new NextResponse('Internal Server Error', {status: 500});
  }
}
