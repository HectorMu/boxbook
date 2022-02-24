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

export const authPutConfig = (data) => {
  if (data) {
    return {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const authGetConfig = () => {
  return {
    method: "GET",
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

export const alertConfig = {
  showCancelButton: true,
  confirmButtonColor: "#6c63ff",
  cancelButtonColor: "#bb2d3b",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
};
