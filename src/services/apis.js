import { commonFunction } from "./apiCall";
import { baseUrl } from "./helper";


// login api
export const getUserData = async(data) =>{
    return await commonFunction("POST",`${baseUrl}/api/`,"")
}
