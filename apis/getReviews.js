

import axiosInstance from "./axiosinstance.js";

const getReviews = async (link) => {
   

    try {

        const response = await axiosInstance.post(
            `/review/getreviews`,
            {url:link}
           
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching places", error?.message);
        throw error;
    }
};
export default getReviews;