import { getApiUrl } from "../../utils/apiBase.js";
async function GetAllContentApi() {
    // console.log("fonction API GetAllContent OK");

    const response = await fetch(`${getApiUrl()}/cms`)
    // console.log("response :",response);
    
    const data = await response.json();
    // console.log("data :", data);

    return data;
    
}

export default GetAllContentApi