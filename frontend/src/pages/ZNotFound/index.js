import { Result } from "antd";
import Button from "components/UI/Button";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn vừa truy cập không tồn tại"
      extra={
        <Button onClick={() => history.push("/")} type="primary">
          Quay về trang chủ
        </Button>
      }
    />
  );
};

export default NotFound;
