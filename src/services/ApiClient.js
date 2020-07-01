import axios from "axios";

const servers = {
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
