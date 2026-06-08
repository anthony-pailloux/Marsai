import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function updateFaq(payload) {
    const res = await fetch(`${getApiUrl()}/faq/${payload.id}`, {
        method: "PUT",
		headers: getAuthHeaders({
			'Content-Type': 'application/json'
		}),
        body: JSON.stringify(payload)
    });

    //récupère la FAQ mise à jour renvoyée par le backend
    const responseData = await res.json();

    if (!res.ok) {

    const error = new Error(`Failed update FAQ ${res.status}`);
    error.details = responseData.errors;// erreur Zod dans le back
    throw error;
    }

    return responseData.data;
}

export default updateFaq;