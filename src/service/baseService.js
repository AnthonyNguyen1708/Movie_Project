import Axios from "axios";
import { ENV } from "../util/settings/config";

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${ENV.REACT_APP_API_URL}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        TokenCybersoft: ENV.REACT_APP_CYBERSOFT_TOKEN,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${ENV.REACT_APP_API_URL}/${url}`,
      method: "POST",
      data: model,
      headers: {
        TokenCybersoft: ENV.REACT_APP_CYBERSOFT_TOKEN,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  get = (url) => {
    return Axios({
      url: `${ENV.REACT_APP_API_URL}/${url}`,
      method: "GET",
      headers: {
        TokenCybersoft: ENV.REACT_APP_CYBERSOFT_TOKEN,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  getPage = (url, page) => {
    return Axios({
      url: `${ENV.REACT_APP_API_URL}/${url}`,
      method: "GET",
      params: {
        maNhom: ENV.REACT_APP_GROUP_CODE,
        soTrang: page,
        soPhanTuTrenTrang: 4,
      },
      headers: {
        TokenCybersoft: ENV.REACT_APP_CYBERSOFT_TOKEN,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };

  delete = (url) => {
    return Axios({
      url: `${ENV.REACT_APP_API_URL}/${url}`,
      method: "DELETE",
      headers: {
        TokenCybersoft: ENV.REACT_APP_CYBERSOFT_TOKEN,
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  };
}
