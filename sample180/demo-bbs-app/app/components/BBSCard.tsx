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
import { BBSData } from "../types/types";

interface BBSDataProps {
  bbsData: BBSData;
}

export const BBSCard = ({ bbsData }: BBSDataProps) => {
  const { id, title, content, createdAt, username } = bbsData;
  return (
    <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{username}</CardDescription>
    </CardHeader>
    <CardContent>{content}</CardContent>
    <CardFooter className="flex-col gap-2">
      <Link href={`/bbs-post/${id}`} className="text-blue-500">
        Read more
      </Link>
    </CardFooter>
  </Card>
  )
}
