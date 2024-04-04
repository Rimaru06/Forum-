import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
export default async function page() {
  const sesssion = await getServerSession(authOptions);
  if(sesssion?.user)
  {
    redirect('/confessions')
  }
  else
  {
    redirect("/api/auth/signin");
  }
}
