import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";

const FilterItem = ({ children, title, rtl }) => {
  return (
    <li
      className={`relative z-30 uppercase text-sm px-4 py-3 flex items-center cursor-pointer group border border-transparent hover:border-black`}
    >
      {title}

      <ChevronDownIcon className="h-4 transform transition group-hover:rotate-180" />

      <div
        className={`absolute top-full border border-black bg-white w-60 px-3 py-4 space-y-3 transform transition origin-top scale-y-0 group-hover:scale-y-100 ${
          rtl ? "-right-px" : "-left-px"
        }`}
      >
        {children}
      </div>
    </li>
  );
};

export default FilterItem;
