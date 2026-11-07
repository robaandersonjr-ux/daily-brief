import { getName } from "../utils/profile";

/** "Good morning, Name" — or just "Good morning" if no name was given. */
export function Greeting({ text }: { text: string }) {
  const name = getName();
  return (
    <>
      {text}
      {name && (
        <>
          , <span className="text-[#AD4E14]">{name}</span>
        </>
      )}
    </>
  );
}
