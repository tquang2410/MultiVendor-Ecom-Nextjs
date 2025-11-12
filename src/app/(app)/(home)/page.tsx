"use client";

import { trpc } from "@/trpc/react";

export default function Home() {
    const { data: user } = trpc.auth.session.useQuery();
  return (
   <div>
       <pre>{JSON.stringify(user, null, 2)}</pre>
   </div>
  )
}