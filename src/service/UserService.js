import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }

  postUserLogin = (model) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, model);
  };

  postBookingHistory = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
}

export const userService = new UserService();
