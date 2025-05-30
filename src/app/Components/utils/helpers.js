import axios from "axios";

const headers = {
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

export async function fetchGitHubUser(username) {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      headers,
    });
    return { user_: res.data, notFound_: false };
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`User "${username}" not found (404)`);
      alert(
        `User "${username}" not found. Please check the username and try again.`
      );
      return { user_: null, notFound_: true };
    }

    console.error("Error fetching GitHub user_:", error);
    return { user_: null, notFound_: true }; // fallback return to avoid undefined
  }
}
