import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

function updateInputTextSize(textArea?: HTMLTextAreaElement) {
  if (!textArea) return;
  textArea.style.height = "0px";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export default function NewTweetForm(){
  const session = useSession();
  if (session.status !== "authenticated") return null;

  return <Form/>;
}

function Form(){
  const session = useSession();
  const [inputText, setInputText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateInputTextSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateInputTextSize(textAreaRef.current);
  }, [inputText]);

  return (
    <form className="flex flex-col gap-2 border-b px-4 py-2">
      <div className="flex gap-4">
        <ProfileImage src={session.data !== null ? session.data.user.image : null} />
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} 
          className="flex-grow resize-none overflow-hidden p4 text-lg outline-none"
          placeholder="What's happening?"/>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  )
}