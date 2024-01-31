import {NextRequest, NextResponse} from 'next/server';
import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';

export async function POST(req: NextRequest) {
  const {email} = await req.json();
  await connect();

  const user = await User.findOne({email: email});

  console.log(user);

  if (!user) {
    return new NextResponse('User not found', {status: 404});
  }

  return new NextResponse(JSON.stringify(user), {status: 200});
}
