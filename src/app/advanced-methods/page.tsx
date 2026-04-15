"use client";
import React from 'react';
import AdvancedMethodsPage from '../../pages/AdvancedMethodsPage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <AdvancedMethodsPage version={version} />;
}
