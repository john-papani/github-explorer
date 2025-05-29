"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

function Followers({ username, notFound, user }) {
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const perPage = 20;

  const totalPages = user ? Math.ceil(user.followers / perPage) : 1;

  const headers = {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  };

  useEffect(() => {
    async function fetchFollowersByPage() {
      if (!username) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.github.com/users/${username}/followers`,
          {
            headers,
            params: { per_page: perPage, page },
          }
        );
        setFollowers(res.data);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
        alert("Something went wrong while fetching followers.");
      } finally {
        setLoading(false);
      }
    }

    if (!notFound) {
      fetchFollowersByPage();
    }
  }, [username, notFound, page]);

  useEffect(() => {
    setPage(1); // Reset page to 1 when username changes
    setFollowers([]); // Reset followers when username changes
  }, [username, notFound]);

  if (notFound) {
    return (
      <div className="w-[90%] mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-white">
          Followers
        </h2>
        <p className="text-center text-red-500">User not found.</p>
      </div>
    );
  }

  if (!loading && followers.length === 0) {
    return (
      <div className="w-[90%] mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-white">
          Followers
        </h2>
        <p className="text-center text-red-500">User has no followers yet.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto md:mt-12 p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
      <h2 className="text-xl font-bold text-center mb-4 text-zinc-900 dark:text-white">
        Followers {user ? `(${user.followers})` : "Loading..."}
      </h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="max-h-[28vh] overflow-y-auto pr-2 space-y-3 custom-scroll">
            {followers.map((follower) => (
              <div
                key={follower.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <Image
                  src={follower.avatar_url}
                  alt={follower.login}
                  width={40}
                  height={40}
                  className="rounded-full shadow"
                />
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    @{follower.login}
                  </p>
                  <p className="font-medium text-sm text-zinc-900 dark:text-white">
                    {follower.login}
                  </p>
                  <a
                    href={follower.html_url}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-xs text-zinc-600 dark:text-zinc-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Followers;
