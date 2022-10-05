import fetch from "node-fetch";

const [OWNER, REPOSITORY] = new URL(process.env.REPOSITORY_URL).pathname.slice(1).split("/");

/**
 * @param {string} path
 * @param {*} options
 */
export async function github(path, options) {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPOSITORY}/${path}`, {
    headers: {
      // only needed for private repositories
      ...(process.env.GITHUB_ACCESS_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}` }),
      "Content-Type": "application/json",
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}