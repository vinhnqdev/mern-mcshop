import { Rate } from "antd";
import { formatReadableDate } from "../../helpers/date";

const ReviewList = ({ review }) => {
  return (
    <li className="bg-white shadow-md p-5 flex flex-col">
      {/** Reviews */}
      <div className="flex items-center justify-between">
        <Rate defaultValue={review.rating} disabled allowHalf className="ant-custom-rating" />
        <div>
          {formatReadableDate(review.createdAt, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>
      {/** Title */}
      <h3 className="text-lg py-5 mb-0">{review.title}</h3>
      <p>{review.comment}</p>
      {/* reviewer */}
      <div className="flex items-center space-x-3 mt-auto">
        <div className="w-10 h-10 text-lg bg-gray-300 flex items-center justify-center rounded-full font-medium uppercase text-white">
          {review.name.slice(0, 1)}
        </div>
        <div>
          <div className="font-medium">{review.name}</div>
          <span className="text-xs text-gray-600 font-light">Đã xác thực</span>
        </div>
      </div>
    </li>
  );
};

export default ReviewList;
