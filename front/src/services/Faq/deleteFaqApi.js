import { getAuthHeaders } from "../../utils/authHeaders.js";

import { getApiUrl } from "../../utils/apiBase.js";

async function deleteFaq(id) {
    const res = await fetch(`${getApiUrl()}/faq/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error(`Failed to delete FAQ ${res.status}`);
}

export default deleteFaq;