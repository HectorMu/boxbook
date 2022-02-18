export const getCountries = async () => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/"
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
