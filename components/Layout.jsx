import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session) {
    return (
    <div className='bg-blue-900 w-screen h-screen flex items-center'>
      <div className="w-full text-center">
        <button onClick={() => signIn('google')} className='bg-white p-2 px-4 rounded-lg'>Login with Google</button>
      </div> 
    </div>
    )
  }
  // console.log(session);
  return (
    <div className='bg-blue-900 min-h-screen font-medium flex'>
      <Navbar />
      {/* <button className='bg-slate-50' onClick={() => signOut()}>Logged in {session.user.email}</button> */}
      <div  className='bg-slate-50  flex-grow mt-2 mr-2 rounded-lg p-4'>{children}</div>
    </div>
  )
}
