import React from "react";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export const BBSCard = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
      <CardAction></CardAction>
    </CardHeader>
    <CardContent>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
      necessitatibus fugit, sit doloribus ad eligendi quod aspernatur! Iusto
      ipsa necessitatibus, libero explicabo exercitationem minus ratione
      sunt sequi aut, nihil incidunt?
    </CardContent>
    <CardFooter className="flex-col gap-2">
      <Link href={"/bbs-post/1"} className="text-blue-500">
        Read more
      </Link>
    </CardFooter>
  </Card>
  )
}
