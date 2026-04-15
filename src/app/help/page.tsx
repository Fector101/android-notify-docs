"use client";
import React from 'react';
import ExtrasPage from '../../pages/ExtrasPage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <ExtrasPage  />;
}
