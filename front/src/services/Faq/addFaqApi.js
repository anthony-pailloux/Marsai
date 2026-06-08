import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function addFaq(payload) {
    const res = await fetch(`${getApiUrl()}/faq`,{
        method: "POST",
		headers: getAuthHeaders({
			'Content-Type': 'application/json'
		}),
        body: JSON.stringify(payload)        
    });

    //récupère la nouvellle FAQ
    const responseData = await res.json();

    if (!res.ok) {

    const error = new Error(`Failed to create FAQ ${res.status}`);
    error.details = responseData.errors;// erreur Zod dans le back
    throw error;
    }

    return responseData.data;
}

export default addFaq;