import API from "../config/API";

export const fetchSome = async (data) => {
  try {
    const response = await fetch(`${API}/some`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
