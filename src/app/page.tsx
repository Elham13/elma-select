import Select from "@/components/Select";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Select options={["One", "Two", "Three", "Four"]} />
    </main>
  );
}
