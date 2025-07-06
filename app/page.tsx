'use client'
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite'; // Используем mobx-react-lite для функц. компонентов
import { BrandModel } from "@/core/models/brands/brand.model";
import BaseLayout from "@/core/views/layouts/base.layout";

const HomePage = observer(() => {
  const [brand] = useState(() => new BrandModel());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    brand.setV(e.target.value)
  };
  
  return (
    <BaseLayout>
        <h1 className="text-2xl">Текущее значение: { brand.v }</h1>
        
        <input
          type="text"
          value={ brand.v }
          onChange={ handleChange }
          className="border border-gray-300 rounded px-2 py-1 mt-2"
        />
    </BaseLayout>
  );
});

export default HomePage;