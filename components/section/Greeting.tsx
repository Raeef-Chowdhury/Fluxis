export function Greeting() {
  const today = new Date();
  return (
    <div className="max-w-[80vw] mx-auto">
      <h1 className=" text-[2rem]  text-center tracking-tight font-semibold  pt-4 font-bold ">
        Good Afternoon Raeef!
      </h1>
      <h2 className="text-[0.8rem] mt-4 text-center text-dark tracking-wide font-extralight ">
        Today is{" "}
        {today.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h2>
    </div>
  );
}
