import React from "react";
import { Tabs } from "antd";
import CheckOut from "./CheckOut";

const HomeCheckOut = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Tab 1`,
      children: <CheckOut />,
    },
    {
      key: "2",
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default HomeCheckOut;
