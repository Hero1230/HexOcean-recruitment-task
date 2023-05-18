import axios from "axios";
import { useMutation } from "react-query";
import { API } from "../../utils/constants";
import { Dish } from "../../utils/types/types";

const addOrder = async (data: Dish) => {
	const response = await axios.post(API, data);
	return response.data.result;
};

export const useAddOrder = () => {
	return useMutation({
		mutationFn: (data: Dish) => addOrder(data),
	});
};
