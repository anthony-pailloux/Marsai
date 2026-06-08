import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function updatePartnerApi(id, { name, url, file }) {

    // console.log("API updatePartner OK");
    
    const formData = new FormData();

    formData.append("name", name ?? "");
    formData.append("url", url ?? "");

    if (file) formData.append("file", file);

    const res = await fetch(`${getApiUrl()}/partner/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData
    });
    // console.log(res);
    

    const data = await res.json();
    // console.log(data);
    

    if (!res.ok) {
        throw new Error(data?.message ?? "Error update partner");
    }

    return data;

}

export default updatePartnerApi;