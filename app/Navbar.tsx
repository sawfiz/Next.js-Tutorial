import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-200 p-5'>
      <Link href="/" className='mr-5'>Home</Link>
      <Link href="/users" className='mr-5'>Users</Link>
    </div>
  )
}

export default Navbar
