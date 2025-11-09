import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5170",
});

const useAxios = () => {
	return axiosInstance;
};

export default useAxios;
