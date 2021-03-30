
export interface HTTPError {
    code: number,
    message: string
}

export const get = async <T>(path: string) : Promise<T|HTTPError|void> => {
    const res = await fetch(path);
    if (!res.ok) return {code: res.status, message: res.statusText};
    if (res.status === 204) return;
    return res.json();
} 

export const post = async <T, V = unknown>(path: string, obj: V) : Promise<T|HTTPError|void> => {
    const res = await fetch(path, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "content-type": "application/json"
        }
    });
    if (!res.ok) return {code: res.status, message: res.statusText};
    if (res.status === 204) return;
    return res.json();
}

export const del = async (path: string) : Promise<HTTPError|void> => {
    const res = await fetch(path, {
        method: "DELETE"
    });
    if (!res.ok) return {code: res.status, message: res.statusText};
    return;
}