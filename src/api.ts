import axios from "axios";

const API_KEY = "J83CRLsV5VEhXFqahVyLfYVZgSHQYdExmrvEYPlF";
const BASE_URL = "https://api.nasa.gov";

export function getMarsInsight() {
  return axios.get(BASE_URL + "/insight_weather/", {
    params: { api_key: API_KEY, feedtype: "json", ver: "1.0" },
  });
}
