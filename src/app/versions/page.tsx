"use client";
import React from 'react';
import VersionsPage from '../../pages/VersionsPage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <VersionsPage setVersion={setVersion} />;
}
