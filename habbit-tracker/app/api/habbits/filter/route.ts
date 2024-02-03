import {Year} from '@/app/models/year';
import connect from '@/app/utils/connection';
import {NextRequest, NextResponse} from 'next/server';
import {Day} from '@/app/models/day'; // Import the missing Day model
import {Month} from '@/app/models/moths';

interface Year {
  user: string;
  year: number;
  days: string[];
}

export async function POST(req: NextRequest) {
  try {
    const {email, value} = await req.json();
    await connect();

    const thisYear = new Date().getFullYear();

    if (value === 'lastYear' || value === 'thisYear') {
      const yearFilter = {
        user: email,
        year: value === 'lastYear' ? thisYear - 1 : thisYear,
      };
      const years: Year | null = await Year.findOne(yearFilter);

      if (!years) {
        return new NextResponse(JSON.stringify({error: 'Year not found'}), {
          status: 404,
        });
      }

      console.log(years);

      const days = await Promise.all(
        years.days.map(async (year: any) => {
          const dayData = await Day.findById(year);
          return dayData;
        })
      );

      return new NextResponse(JSON.stringify(days), {status: 200});
    } else {
      const monthFilter = {user: email, months: `${value}/${thisYear}`};
      const month = await Month.findOne(monthFilter);

      console.log(month);

      if (month) {
        const days = await Promise.all(
          month.days.map(async (day: any) => {
            const dayData = await Day.findById(day);
            return dayData;
          })
        );

        return new NextResponse(JSON.stringify(days), {status: 200});
      } else {
        return new NextResponse(JSON.stringify({error: 'Month not found'}), {
          status: 404,
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
    });
  }
}
