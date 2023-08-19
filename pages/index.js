import { signOut, useSession } from "next-auth/react";

import Layout from "@/components/Layout";

const Home = () => {
  const { data: session } = useSession();

  return ( 
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello, <b>{session?.user.name}</b></h2>

        <div onClick={() => signOut()} className="flex bg-gray-300 gap-2 text-black rounded-lg overflow-hidden px-1 py-1">
          <img src={session?.user.image} alt="Logo" className="w-8 h-8"/>
          {session?.user.name}
        </div>
      </div>
    </Layout>
   );
}

export default Home;