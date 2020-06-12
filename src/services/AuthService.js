import { apiClient } from "./ApiClient.js";

export default {
  postLogin(credentials) {
    console.log(credentials);

    return apiClient.post("/Usuario/login", credentials);
  },
  postRegister(credentials) {
    return apiClient.post("/Usuario/registrarUsuario", credentials);
  },
};
//test1@test2.com
//1235456
