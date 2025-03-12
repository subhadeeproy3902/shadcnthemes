"use client";

import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ButtonsDiv() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buttons Showcase</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button disabled>Disabled</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </CardContent>
    </Card>
  );
}
