import axios from "axios";

export default axios.create({
  baseURL: "https://contacts-api-cubos.herokuapp.com",
  timeout: 10000,
});
