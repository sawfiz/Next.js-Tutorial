import React from 'react';
import Link from 'next/link';
import UserTable from './UserTable';

interface Props {
  searchParams: { sortOrder: string };
}

const usersPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <button className="btn">
        <Link href="/users/new">New</Link>
      </button>
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

export default usersPage;
