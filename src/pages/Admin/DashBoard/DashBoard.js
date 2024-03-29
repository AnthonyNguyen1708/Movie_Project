import { Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getUserListAction,
} from "../../../redux/actions/AdminAction";
import EditUser from "./EditUser";
import AddNewUser from "./AddNewUser";

const DashBoard = () => {
  // Table's variants
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //Component's variants
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUserListAction);
  }, []);

  const columns = [
    {
      title: "No",
      key: "taiKhoan",
      render: (item) => {
        return <div>{userList.indexOf(item) + 1}</div>;
      },
    },
    {
      title: "loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (dataIndex) => {
        if (dataIndex === "QuanTri") {
          return "Quản trị";
        } else if (dataIndex === "KhachHang") {
          return "Khách hàng";
        }
      },
      ...getColumnSearchProps("maLoaiNguoiDung"),
    },
    {
      title: "Tài khoản",
      key: "taiKhoan",
      dataIndex: "taiKhoan",
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "Họ & Tên",
      key: "hoTen",
      dataIndex: "hoTen",
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      key: "soDT",
      dataIndex: "soDT",
    },
    {
      title: "Chức năng",
      key: "soDT",
      render: (user) => {
        return (
          <div>
            <EditOutlined
              className="px-1 ant-btn ant-btn-icon-only bg-transparent hover:bg-transparent focus:bg-transparent text-blue-700 hover:text-blue-500 focus:text-blue-500 border-0 shadow-none cursor-pointer"
              onClick={() => {
                setUser(user);
                setOpenEdit(true);
              }}
            />

            <Popconfirm
              title="Delete movie"
              description={`Bạn có chắc muốn xóa ${user.hoTen}?`}
              onConfirm={() => {
                dispatch(deleteUserAction(user.taiKhoan));
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                onClick={() => {}}
                className="px-1 ant-btn ant-btn-icon-only bg-transparent hover:bg-transparent focus:bg-transparent text-red-600 hover:text-red-500 focus:text-red-500 border-0 shadow-none"
              ></DeleteOutlined>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h3>Quản lý danh sách phim</h3>
      <Button
        onClick={() => {
          setOpenAdd(true);
        }}
        className="mb-4"
        type="primary"
      >
        Thêm người dùng
      </Button>
      <Table columns={columns} dataSource={userList} />
      <Modal
        title={
          <h5 className="ant-typography text-base mb-3">
            Cập nhật thông tin người dùng
            <hr />
          </h5>
        }
        centered
        open={openEdit}
        onOk={() => setOpenEdit(false)}
        onCancel={() => setOpenEdit(false)}
        width={500}
        footer={""}
      >
        <EditUser user={user} />
      </Modal>
      <Modal
        title={
          <h5 className="ant-typography text-base mb-3">
            Thêm người dùng
            <hr />
          </h5>
        }
        centered
        open={openAdd}
        onOk={() => setOpenAdd(false)}
        onCancel={() => setOpenAdd(false)}
        width={500}
        footer={""}
      >
        <AddNewUser user={user} />
      </Modal>
    </div>
  );
};

export default DashBoard;
