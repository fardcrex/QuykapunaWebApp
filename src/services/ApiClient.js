import axios from "axios";

const servers = {
  janina: `http://192.168.0.28:3000`,
  local: `http://localhost:3000`,
  produccion: `https://api-pollo.herokuapp.com`,
};

const apiClient = axios.create({
  baseURL: servers.produccion,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { apiClient, servers };
