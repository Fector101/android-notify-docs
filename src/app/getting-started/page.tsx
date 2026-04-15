"use client";
import React from 'react';
import MainPage from '../../pages/MainPage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <MainPage  />;
}
