import { getApiUrl } from "../../utils/apiBase.js";
async function GetPartnerApi() {
    // console.log("fonction API GetPartner OK");

    const response = await fetch(`${getApiUrl()}/partner`)
    // console.log(response);
    
    const data = await response.json();
    // console.log(data);

    return data;
    
}

export default GetPartnerApi