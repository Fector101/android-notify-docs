"use client";
import React from 'react';
import HomePage from '../pages/HomePage';
import { useVersion } from '../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <HomePage  />;
}
