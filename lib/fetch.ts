const url =
  "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-01-29";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "078df26855msh5d5bb495a453540p1a14e8jsncd42a41d8437",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
};

export async function fetchApi() {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data;
  } catch (error) {
    console.error(error);
  }
}
