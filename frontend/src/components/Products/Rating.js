import { StarIcon } from "@heroicons/react/solid";
import React from "react";

const Rating = ({ rating, size }) => {
  return (
    <div>
      <ul className="flex items-center">
        {Array(+rating.toFixed())
          .fill()
          .map((x, idx) => {
            return (
              <li key={idx}>
                <StarIcon className={`${size === "medium" ? "h-5" : "h-4"} text-yellow-400`} />
              </li>
            );
          })}
      </ul>
      <span
        className={`inline-block pl-1 ${size === "medium" ? "text-sm" : "text-xs"} text-gray-700`}
      >
        3 reviews
      </span>
    </div>
  );
};

export default Rating;