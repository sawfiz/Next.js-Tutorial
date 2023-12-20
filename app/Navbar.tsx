// Navbar.tsx
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href="/">Home</Link>
      <Link href="/users">Users</Link>
      {!session && <Link href="/api/auth/signin">Login</Link>}
      {session && (
        <>
          <Image
            className='rounded-full'
            src={session.user!.image}
            width={25}
            height={25}
            alt={'User Image'}
          />
          <Link href="/api/auth/signout">Sign Out</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
