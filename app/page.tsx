import { Greeting } from "@/components/homepage/Greeting";
import Priorities from "@/components/homepage/Priorities";
export default function Home() {
  return (
    <div className=" min-h-screen bg-background">
      <Greeting />
      <Priorities />
    </div>
  );
}
