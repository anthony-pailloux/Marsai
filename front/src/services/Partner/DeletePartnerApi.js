import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function deletePartnerApi( id ) {

    // console.log("API updatePartner OK", id);

    const res = await fetch(`${getApiUrl()}/partner/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if(!res.ok) {
        throw new Error(data?.message ?? "Error delete partner");
    }

    return data;

}

export default deletePartnerApi;