import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Friends() {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      router.replace('/');
    }
  }, []);

  return (
    <div>
      <h1>Halaman Friend</h1>
    </div>
  );
}
