import requester from "../../app/api";

export const fetchBannersAction = async (next) => {
  try {
    const res = await requester({
      method: "GRT",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
