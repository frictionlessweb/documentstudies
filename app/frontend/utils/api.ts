const REQUEST_FAILED = "API REQUEST FAILED";

export const HTTP = {
  get: async <T>(url: string): Promise<T> => {
    const res = await window.fetch(url);
    if (!res.ok) {
      throw new Error(REQUEST_FAILED);
    }
    return res.json() as T;
  },
  delete: async (url: string): Promise<void> => {
    const res = await window.fetch(url, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(REQUEST_FAILED);
    }
  },
  post: async <T, U>(url: string, body: U): Promise<T> => {
    const res = await window.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("API request failed");
    }
    return res.json() as T;
  },
};
