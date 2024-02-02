import {NextRequest, NextResponse} from 'next/server';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {Month} from '@/app/models/moths';
import {Day} from '@/app/models/day';

interface Month {
  months: string;
  user: string;
  days: string[];
}

export async function POST(req: NextRequest) {
  const {email} = await req.json();
  await connect();

  const user = await User.findOne({email: email});

  const months: Month[] = await Promise.all(
    user.months.map(async (id: string) => {
      return await Month.findById(id);
    })
  );

  return new NextResponse(JSON.stringify(months), {status: 200});
}
