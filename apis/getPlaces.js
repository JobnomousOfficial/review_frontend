

import axiosInstance from "./axiosinstance.js";

const getPlaces = async (q) => {
   

    try {

        const response = await axiosInstance.get(
            `/review/getplace?query=${q}`,
           
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching places", error?.message);
        throw error;
    }
};
export default getPlaces;