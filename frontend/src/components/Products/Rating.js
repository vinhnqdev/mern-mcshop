import { StarIcon } from "@heroicons/react/solid";
import React from "react";

const Rating = ({ rating, size }) => {
  return (
    <div>
      <div>
        {rating === 0 && <p className="text-xs text-gray-700">Chưa có đánh giá</p>}
        {rating !== 0 && (
          <ul className="flex items-center mb-3">
            {rating !== 0 &&
              Array(+rating.toFixed())
                .fill()
                .map((x, idx) => {
                  return (
                    <li key={idx}>
                      <StarIcon
                        className={`${size === "medium" ? "h-5" : "h-4"} text-yellow-400`}
                      />
                    </li>
                  );
                })}
          </ul>
        )}
      </div>
      <span
        className={`inline-block pl-1 ${size === "medium" ? "text-sm" : "text-xs"} text-gray-700`}
      >
        3 reviews
      </span>
    </div>
  );
};

export default Rating;
