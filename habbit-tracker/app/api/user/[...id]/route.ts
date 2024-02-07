import {User} from '@/app/models/user';
import connect from '@/app/utils/connection';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop();
  await connect();
  const user = await User.findById(id);
  if (!user) {
    return new NextResponse('User not found', {status: 404});
  }
  return new NextResponse(JSON.stringify(user), {status: 200});
}
