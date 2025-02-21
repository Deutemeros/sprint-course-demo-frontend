
const commonHeaders = {};
const baseUrl = "http://localhost:9000/"

export const get = <T>(resource: string, body?: any, headers?: HeadersInit): Promise<T> => {
    const url = baseUrl + resource;
    return fetch(url, {
        method: "GET",
        body: JSON.stringify(body),
        headers: {
            ...commonHeaders,
            ...headers
        }
    }).then(response => response.json()).catch(err => {
        console.error(err);
        return err;
    })
}

export const post = <T>(resource: string, body?: any, headers?: HeadersInit): Promise<T> => {
    const url = baseUrl + resource;
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            ...commonHeaders,
            ...headers
        }
    }).then(response => response.json()).catch(err => {
        console.error(err);
        return err;
    })
}

export const del = <T>(resource: string, body?: any, headers?: HeadersInit): Promise<T> => {
    const url = baseUrl + resource;
    return fetch(url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            ...commonHeaders,
            ...headers
        }
    }).then(response => response.json()).catch(err => {
        console.error(err);
        return err;
    })
}