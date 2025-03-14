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
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="destructive">Destructive</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" className="bg-muted hover:bg-muted/80 text-secondary-foreground">Muted</Button>
      </CardContent>
    </Card>
  );
}
