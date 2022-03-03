import API from "../config/API";
import { authGetConfig, authPostConfig } from "../helpers/helpers";
import { getAndSetAccessToken } from "../helpers/helpers";

export const checkYearlyGoal = async () => {
  try {
    const response = await fetch(`${API}/user/checkgoal`, authPostConfig());
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const setYearlyGoal = async (goal) => {
  try {
    const response = await fetch(`${API}/user/setgoal`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAndSetAccessToken(),
      },
      body: JSON.stringify({ goal }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSolitudes = async () => {
  try {
    const response = await fetch(`${API}/social/getsolitudes`, authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFriends = async () => {
  try {
    const response = await fetch(`${API}/user/getfriends`, authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
