"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui";

const LoginButton = () => {
  return (
    <Button
      className="cursor-pointer"
      variant={"outline"}
      onClick={() => signIn("id-server", { redirectTo: "/" })}
    >
      Login
    </Button>
  );
};
export default LoginButton;
