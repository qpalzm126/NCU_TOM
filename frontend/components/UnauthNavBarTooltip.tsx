"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";
export default function UnAuthTooltip() {
  return (
    <>
      <Button onClick={() => signIn()} asChild variant="secondary">
        <Link href="/auth/signin">Login</Link>
      </Button>
    </>
  );
}
