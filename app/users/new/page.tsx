'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const NewUserPage = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          router.push('/users');
        }}
      >
        Create
      </button>
    </div>
  );
};

export default NewUserPage;
