import React from "react";
import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to MCSHOP",
  description: "Điện thoại, Laptop giá rẻ nhất",
  keywords: "Phone, Head phone, Laptop, Watch",
};
