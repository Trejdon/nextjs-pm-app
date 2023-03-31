const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

// body: body && JSON.stringify(body) is equivalent to ...(body && { body: JSON.stringify(body) })
// Really interesting usage of the spread operator and && logic to achieve a slightly cleaner usage pattern

export const register = (user) => {
  return fetcher({ url: "/api/register", method: "post", body: user });
};

export const signin = (user) => {
  return fetcher({ url: "/api/singin", method: "post", body: user });
};
