"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have a LoadingSpinner component
const headers = {
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

function UserRepositories({ username, notFound, user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    async function fetchAllRepos() {
      try {
        setLoading(true);
        let allRepos = [];
        let page = 1;
        const perPage = 100; // max allowed by GitHub API

        while (true) {
          const res = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
              params: { page, per_page: perPage },
              headers,
            }
          );

          allRepos = [...allRepos, ...res.data];

          // If less than perPage repos returned, we've reached the last page
          if (res.data.length < perPage) break;

          page++;
        }

        setRepos(allRepos);
      } catch (error) {
        console.error("Failed to fetch all repositories:", error);
        // alert(
        //   "Something went wrong while fetching repositories. Please try again later."
        // );
      } finally {
        setLoading(false);
      }
    }

    if (!notFound) fetchAllRepos();
  }, [username, notFound]);

  const sortedRepos = [...repos].sort((a, b) =>
    sortOrder === "asc"
      ? a.stargazers_count - b.stargazers_count
      : b.stargazers_count - a.stargazers_count
  );

  if (notFound) {
    return (
      <div className="w-[95%] md:w-3/5 mx-auto p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-white">
          Repositories
        </h2>
        <p className="text-center text-red-500">User not found.</p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="w-[90%] md:w-3/5 mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl ">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-white">
          Repositories
        </h2>
        <p className="text-center text-red-500">
          User has no repositories yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[95%] lg:w-3/5 mx-auto p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
      {loading ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Repositories Loading...
          </h2>
          <p className="italic text-sm text-zinc-400 mt-1">
            Please wait while we fetch the repositories for {user?.login}.
          </p>
          <p className="italic text-xs text-zinc-400 mt-1 animate-pulse">
            This may take a few seconds depending on the number of repositories.
          </p>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Repositories ({user.public_repos})
            </h2>
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="flex items-center gap-2 text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <span>Sort by Stars</span>
              {sortOrder === "asc" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4 rotate-180"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-3 custom-scroll">
            {sortedRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:shadow transition"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  {repo.name}
                </a>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                  {repo.description || "No description provided."}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  ⭐ {repo.stargazers_count} stars
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRepositories;
