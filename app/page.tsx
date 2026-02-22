import { Greeting } from "@/components/section/Greeting";
import Priorities from "@/components/section/Priorities";
export default function Home() {
  return (
    <div className=" min-h-screen bg-background">
      <Greeting />
      <Priorities />
    </div>
  );
}
