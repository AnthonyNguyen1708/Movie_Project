import React, { useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  getFullMovieListAction,
} from "../../../redux/actions/AdminAction";
import { NavLink } from "react-router-dom";

const Films = () => {
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.admin);

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
  const columns = [
    {
      title: "Mã Phim",
      width: "10%",
      dataIndex: "maPhim",
      key: "maPhim",
      ...getColumnSearchProps("maPhim"),
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Poster",
      width: "20%",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (dataIndex) => {
        return <img width={150} height={200} src={dataIndex} alt="" />;
      },
    },
    {
      title: "Tên Phim",
      width: "20%",
      dataIndex: "tenPhim",
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
    },
    {
      title: "Mô tả",
      width: "30%",
      dataIndex: "moTa",
      key: "moTa",
      render: (dataIndex) => {
        return <p>{dataIndex}</p>;
      },
    },
    {
      title: "Action",
      width: "5%",
      key: "action",
      dataIndex: "",
      render: (film) => (
        <div>
          <NavLink to={`/admin/films/edit/${film.maPhim}`}>
            <EditOutlined
              className="px-1 ant-btn ant-btn-icon-only bg-transparent hover:bg-transparent focus:bg-transparent text-blue-700 hover:text-blue-500 focus:text-blue-500 border-0 shadow-none cursor-pointer"
              onClick={() => {}}
            />
          </NavLink>

          <DeleteOutlined
            onClick={() => {
              if (window.confirm("Bạn có muốn xóa phim " + `${film.tenPhim}`)) {
                dispatch(deleteMovieAction(film.maPhim));
              } else {
                console.log("no");
              }
            }}
            className="px-1 ant-btn ant-btn-icon-only bg-transparent hover:bg-transparent focus:bg-transparent text-red-600 hover:text-red-500 focus:text-red-500 border-0 shadow-none"
          ></DeleteOutlined>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getFullMovieListAction);
  }, []);
  return (
    <div>
      <h3>Quản lý danh sách phim</h3>
      <Table columns={columns} dataSource={movieList} />
    </div>
  );
};

export default Films;
