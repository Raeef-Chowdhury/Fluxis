import { Greeting } from "@/components/section/Greeting";
import Priorities from "@/components/section/Priorities";
import { Summary } from "@/components/section/Summary";
export default function Home() {
  return (
    <div className=" min-h-screen bg-background">
      <Greeting />
      <Summary />
      <Priorities />
    </div>
  );
}
