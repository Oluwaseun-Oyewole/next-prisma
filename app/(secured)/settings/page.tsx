"use client";
import { Button } from "@/common/components/button/button.components";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const logout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p>{JSON.stringify(session)}</p>
      <p>Settings Page</p>
      <Button onClick={logout}>SignOut</Button>
    </main>
  );
}
