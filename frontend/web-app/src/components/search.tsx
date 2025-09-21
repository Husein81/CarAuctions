"use client";

import { useParamsStore } from "@/hooks";
import { Input, Icon } from "./";
import { ChangeEvent, useEffect, useState } from "react";

const Search = () => {
  const { searchTerm, setParams } = useParamsStore();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (searchTerm === "") setValue("");
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSearch = () => setParams({ searchTerm: value });

  return (
    <div className="flex w-1/2 mx-auto items-center border-2 border-gray-300 rounded-full py-2 shadow-sm">
      <Input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
          }
        }}
        value={value}
        onChange={handleChange}
        placeholder="Search for cars by make, model, or color"
        className="flex-grow pl-5 bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none text-sm text-gray-600 shadow-none"
      />
      <Icon
        name="Search"
        size={34}
        className="text-gray-50 bg-red-400 p-2 cursor-pointer mx-2 rounded-full"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
