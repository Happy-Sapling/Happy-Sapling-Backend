import axios from "axios";

const API_URL = "http://localhost:9000/api/Users/auth/";

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};

export default verifyUser;
