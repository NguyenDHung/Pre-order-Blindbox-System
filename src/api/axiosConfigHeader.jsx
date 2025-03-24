const axiosConfigHeader = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Nếu API yêu cầu cookie
};
const axiosConfigSendFileHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};
export { axiosConfigHeader, axiosConfigSendFileHeader };
