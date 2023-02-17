import axios from "axios";

const baseUrl = `https://api.woodongs.site/`;
export const axiosInstance = axios.create({ baseURL: baseUrl });


