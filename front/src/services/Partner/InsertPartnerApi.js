import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function InsertPartnerApi(formData) {
    const response = await fetch(`${getApiUrl()}/partner`,{
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
    })
    // console.log(response);
    
    const data = await response.json().catch(()=> null);
    // console.log(data);
    
    if (!response.ok) {
        throw new Error(data?.error || "Error during partner insertion")
    }

    return data;
    
}

export default InsertPartnerApi