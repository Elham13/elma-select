"use client";
import Select from "@/components/Select";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Select options={["One", "Two", "Three", "Four"]} placeholder="Hello" />
    </main>
  );
}
