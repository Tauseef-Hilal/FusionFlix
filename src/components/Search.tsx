"use client";

import { useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";

import IconButton from "./IconButton";

interface SearchProps {
  value: string;
  focused: boolean;
  className?: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSearch: () => void;
}

const Search: React.FC<SearchProps> = ({
  value,
  focused,
  className,
  onChange,
  onFocus,
  onBlur,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused) {
      inputRef.current?.focus();
    }
  }, [focused]);

  const handleSearchBtnPress = () => {
    if (!value) return;
    onSearch();
    inputRef.current?.blur();
  };

  return (
    <div className={`flex h-full w-full ${className}`}>
      {!focused && <IoMdSearch className="ml-4 text-transparent text-xl" />}
      <div
        className={`
          flex items-center relative rounded-l-full border border-neutral-700 
          focus-within:border-blue-400 w-full
      `}
      >
        {focused && (
          <IoMdSearch
            className={`
              absolute -z-10 left-4 text-neutral-300 text-xl
            `}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key != "Enter") return;
            handleSearchBtnPress();
          }}
          className={`
            pl-4 placeholder-neutral-500 text-neutral-300 bg-transparent
            font-light outline-none w-full ${focused ? "pl-[48px] pr-9" : ""}
          `}
        />
        <IconButton
          className={`
            absolute top-1/2 -translate-y-1/2 right-0 
            ${value.length <= 0 ? "opacity-0 -z-10" : ""}
          `}
          onClick={() => onChange("")}
          onMouseDown={(e) => e.preventDefault()}
          icon={RxCross1}
          size={20}
        />
      </div>
      <IconButton
        onClick={handleSearchBtnPress}
        onMouseDown={(e) => e.preventDefault()}
        className={`
          bg-neutral-800 hover:bg-neutral-800 rounded-full rounded-l-none 
          border border-l-0 border-neutral-700 px-4 h-full
        `}
        icon={IoMdSearch}
        size={20}
      />
    </div>
  );
};

export default Search;
