'use client'
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite'; // Используем mobx-react-lite для функц. компонентов
import { useRouter } from "next/navigation";

const HomePage = observer(() => {
  const router = useRouter();
  
  useEffect(() => {
    // Редирект после монтирования компонента
    router.push('/products');
  }, []);
  
  return (
    <>
    </>
  );
});

export default HomePage;