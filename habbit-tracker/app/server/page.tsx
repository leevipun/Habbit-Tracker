import {getServerSession} from 'next-auth';
import {options} from '../api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
