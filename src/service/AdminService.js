import { ENV } from "../util/settings/config";
import { baseService } from "./baseService";

export class AdminService extends baseService {
  constructor() {
    super();
  }

  getFullMovieList = () => {
    return this.get(
      `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${ENV.REACT_APP_GROUP_CODE}`
    );
  };

  getMovieInfo = (movieId) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  };
  getUserList = () => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`);
  };
  deleteMovie = (movieId) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${movieId}`);
  };

  deleteUSer = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };

  postUpdateUser = (user) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, user);
  };

  postNewMovie = (data) => {
    return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, data);
  };
}

export const adminService = new AdminService();
