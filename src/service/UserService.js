import { baseService } from "./baseService";

export class UserService extends baseService {
  constructor() {
    super();
  }

  postUserLogin = (model) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, model);
  };
}

export const userService = new UserService();
