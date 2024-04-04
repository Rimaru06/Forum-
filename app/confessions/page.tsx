"use client";
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={ async ()=> {
        await signOut();
        router.push("/api/auth/signin");
      }} >logout</Button>
    </div>
  )
}
