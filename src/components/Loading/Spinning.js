import React, { Fragment } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const Spinning = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
          }}
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50"
        >
          <div className="text-3xl text-white">
            <SyncOutlined className="mr-5" spin />
            Loading...
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Spinning;
