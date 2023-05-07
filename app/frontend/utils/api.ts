const REQUEST_FAILED = "API REQUEST FAILED";

const CSRF_TOKEN = (
  document.querySelector("[name=csrf-token]")! as unknown as any
).content;

interface FormTranslatable {
  [key: string]: string | Blob;
}

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
      headers: {
        "X-CSRF-Token": CSRF_TOKEN,
      },
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
        "X-CSRF-Token": CSRF_TOKEN,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error("API request failed");
    }
    return res.json() as T;
  },
  postFormData: async <T>(url: string, body: FormData): Promise<T> => {
    const res = await window.fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": CSRF_TOKEN,
      },
      body,
    });
    if (!res.ok) {
      throw new Error("API request failed");
    }
    return res.json() as T;
  },
};
