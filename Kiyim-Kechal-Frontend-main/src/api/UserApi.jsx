import api from "./ApiService.jsx";

const UserApi = {
  login: (username, password) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return api.post("/api/v1/users/token", formData);
  },
  getSession: () => api.get("/api/v1/users/my_session/"),
  signup: (username, password) =>
    api.post("/api/v1/users/", { username, password }),
  listUsers: () => api.get("/api/v1/users/"),
};

export default UserApi;
