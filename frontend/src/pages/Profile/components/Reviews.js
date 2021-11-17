import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "app/orderThunk";
import { Button, message, Rate } from "antd";
import Modal from "components/UI/Modal";
import { Form } from "antd";
import TextArea from "rc-textarea";
import productApi from "api/productApi";
import { useHistory } from "react-router-dom";
import MCButton from "components/UI/Button";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
const MyReviews = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productId, setProductId] = useState();
  const [commentError, setCommentError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [clickedProductIndex, setClickedProductIndex] = useState();

  const orders = useSelector((state) => state.order.orders);

  const history = useHistory();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handalOpenModal = (productId, index) => {
    setIsModalVisible(true);
    setProductId(productId);
    setClickedProductIndex(index);
  };

  const handleSubmitComment = async () => {
    if (rating === 0) {
      return setRatingError("Bạn vui lòng chọn đánh giá");
    } else {
      setRatingError("");
    }
    if (comment === "") {
      setCommentError("Bạn vui lòng viết nhận xét cho sản phẩm");
      return;
    } else {
      setCommentError("");
    }

    const review = {
      comment,
      rating,
    };

    try {
      await productApi.reviewProduct(review, productId);
      message.success({
        content: "Đánh giá thành công ^^",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      setIsModalVisible(false);
      setComment("");
      setRating(0);
    } catch (error) {
      message.success({
        content: error.response.data.message || error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
      setIsModalVisible(false);
      setComment("");
      setRating(0);
    }
  };

  const desc = ["Quá tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

  return (
    <>
      <h3 className="font-normal text-lg py-5">Nhận xét sản phẩm đã mua</h3>
      {orders && orders.length === 0 && (
        <div className="bg-white p-4 flex flex-col items-center justify-center">
          <img src="/images/review-empty.jpeg" alt="" />
          <p>Bạn chưa nhận sản phẩm nào</p>
          <Button type="primary" onClick={() => history.push("/")}>
            Tiếp tục mua sắm
          </Button>
        </div>
      )}
      <ul className="grid gap-y-5 gap-x-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders?.map((order, index) => (
          <li key={order._id} className="bg-white flex flex-col shadow p-6">
            <div className="w-1/2 mx-auto md:w-4/6 mb-5">
              <img src={order.image} alt="" />
            </div>
            <p className="py-2">{order.name}</p>
            <MCButton
              onClick={() => handalOpenModal(order.productId, index)}
              className="mc_button mc_button--primary mc_button--pos-tr mc_button--round-sm px-4 py-1 mt-auto"
            >
              Viết nhận xét
            </MCButton>
            {/* <Button
              onClick={() => handalOpenModal(order.productId, index)}
              style={{ marginTop: "auto" }}
              type="primary"
              block
            >
              Viết nhận xét
            </Button> */}
          </li>
        ))}
      </ul>

      {isModalVisible && (
        <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10">
              <img src={orders[clickedProductIndex].image} alt="" className="w-full h-full" />
            </div>
            <p className="text-xs mb-0">{orders[clickedProductIndex].name}</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-medium mb-0">Vui lòng đánh giá</p>
            <Rate tooltips={desc} onChange={(value) => setRating(value)} value={rating} />
            {ratingError && <span className="text-xs mt-2 text-red-500">*{ratingError}</span>}
          </div>

          <div className="gap-5 mt-3">
            <Form.Item style={{ width: "100%" }}>
              <TextArea
                style={{ width: "100%", border: "1px solid #000" }}
                rows={4}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              {commentError && <span className="text-xs mt-2 text-red-500">*{commentError}</span>}
            </Form.Item>
            <Form.Item>
              <div className="flex items-center gap-3">
                <MCButton
                  onClick={() => setIsModalVisible(false)}
                  className="mc_button_reverse mc_button--error mc_button--pos-tr mc_button--round-sm px-4 py-1 w-1/2"
                >
                  Huỷ bỏ
                </MCButton>
                <MCButton
                  type="submit"
                  onClick={handleSubmitComment}
                  className="mc_button_reverse mc_button--primary mc_button--pos-tl mc_button--round-sm px-4 py-1 w-1/2"
                >
                  Gửi đánh giá
                </MCButton>
              </div>
            </Form.Item>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MyReviews;
