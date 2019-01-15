import { API_URL } from '../constants';

const headers = () => {
	return {
        'Content-Type': 'application/json'
	};
}

const httpRequest = async(verb, url, body) => {
    const response = await fetch(`${API_URL}${url}`, {
		method: verb,
		headers: headers(),
		body: (verb === 'GET') ? null : JSON.stringify(body)
    })
    
    return response;
}

export const GET = async(url) => {
    let responseJson;
    try {
        let response = await httpRequest('GET', url, {});
        responseJson = await response.json();
    } catch(e) {
        throw e
    }
    return responseJson;
}

export const POST = async(url, body) => {
    let responseJson;
    try {
        let response = await httpRequest('POST', url, body);
        responseJson = await response.json();
    } catch(e) {
        throw e
    }
    return responseJson;
}

export const PUT = async(url, body) => {
    let responseJson;
    try {
        let response = await httpRequest('PUT', url, body);
        responseJson = await response.json();
    } catch(e) {
        throw e
    }
    return responseJson;
}