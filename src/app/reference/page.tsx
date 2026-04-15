"use client";
import React from 'react';
import ReferencePage from '../../pages/ReferencePage';
import { useVersion } from '../../context/VersionContext';

export default function Page() {
  const { version, setVersion } = useVersion();
  return <ReferencePage version={version} />;
}
