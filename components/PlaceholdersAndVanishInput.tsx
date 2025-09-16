

import type React from "react"
import { useRef, useState } from "react"
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  isGenerating,
  onStop,
}: {
  placeholders: string[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isGenerating?: boolean
  onStop?: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit && onSubmit(e)
    setValue("")
  }

  return (
    <form
      className={cn(
        "w-full relative max-w-xl mx-auto bg-white dark:bg-[#212121] h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
      )}
      onSubmit={handleSubmit}
    >
      <input
        name="message"
        autoComplete="off"
        onChange={(e) => {
          setValue(e.target.value)
          onChange && onChange(e)
        }}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
        )}
      />

      <button
        disabled={!isGenerating && !value}
        onClick={isGenerating ? onStop : undefined}
        type={isGenerating ? "button" : "submit"}
        className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full bg-black disabled:bg-[#ECECEC] dark:bg-white dark:disabled:bg-[#424242] transition duration-200 flex items-center justify-center"
      >
        {isGenerating ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white dark:fill-black"
          >
            <rect x="3" y="3" width="10" height="10" rx="2" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "icon",
              value ? "fill-white dark:fill-black" : "fill-black"
            )}
          >
            <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path>
          </svg>
        )}
      </button>

      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        {!value && (
          <p className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate">
            Ask anything
          </p>
        )}
      </div>
    </form>
  )
}
