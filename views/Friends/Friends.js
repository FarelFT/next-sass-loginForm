import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';

export default function Friends() {
  const [dataUsers, setDataUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      router.replace('/');
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const users = await response.json();
        setDataUsers(users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!dataUsers.length) return <h3>Loading ..... </h3>;

  console.log(dataUsers);

  return (
    <Layout title='Friend &mdash; Home'>
      <div>
        {dataUsers.map((userData) => {
          <h1>{userData.name}</h1>;
        })}
      </div>
    </Layout>
  );
}
