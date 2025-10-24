import Image from "next/image";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            necessitatibus fugit, sit doloribus ad eligendi quod aspernatur!
            Iusto ipsa necessitatibus, libero explicabo exercitationem minus
            ratione sunt sequi aut, nihil incidunt?
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Link href="/bbs-post/1">Read more</Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
