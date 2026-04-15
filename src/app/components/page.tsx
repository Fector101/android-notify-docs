"use client";
import React from 'react';
import ComponentsPage from '../../pages/ComponentsPage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <ComponentsPage version={version} setVersion={setVersion} />;
}
