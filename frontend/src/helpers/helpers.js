export const checkEmptyValue = (object) => {
  for (var key in object) {
    if (object[key] === "" || object[key] === null || object[key] === undefined)
      return {
        result: true,
        expected: `Expected value for '${key}'`,
      };
  }
  return {
    result: false,
  };
};

export const postConfig = (data) => {
  return {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export const authPostConfig = (data) => {
  if (data) {
    return {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const getAndSetAccessToken = () => {
  const user = JSON.parse(window.localStorage.getItem("BoxBookSession"));
  return `Bearer ${user.AccessToken}`;
};
