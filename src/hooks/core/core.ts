
const commonHeaders = {};

export const get = <T>(url: string, body?: any, headers?: HeadersInit): Promise<T> => {
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

export const post = <T>(url: string, body?: any, headers?: HeadersInit): Promise<T> => {
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