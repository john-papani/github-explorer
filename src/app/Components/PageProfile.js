"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const headers = {
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
};

function PageProfile({ username, setNotFound, setUser }) {
  const [user_, setUser_] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(
          `https://api.github.com/users/${username}`,
          { headers }
        );
        setUser_(res.data);
        setUser(res.data);
        console.log("Fetched user:", res.data);
        setNotFound(false);
      } catch (error) {
        if (error.response?.status === 404) {
          alert(`User "${username}" not found on GitHub.`);
          setUser_(null);
          setNotFound(true);
        } else {
          console.error("Failed to fetch GitHub user:", error);
          alert("Something went wrong while fetching the user.");
        }
      }
    }

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (!username || !user_) {
    return (
      <div className="w-[90%] mx-auto mt-16 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-zinc-900 dark:text-white">
          Profile
        </h2>
        <p className="text-center text-red-500">Please enter a username.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto mt-2 p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl">
      <div className="flex flex-col items-center">
        {user_.avatar_url && (
          <a href={user_.html_url} target="_blank" rel="noopener noreferrer">
            <Image
              src={user_.avatar_url}
              alt={user_.name || "GitHub Avatar"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full shadow-md hover:scale-105 transition-transform"
            />
          </a>
        )}

        <h2 className="text-xl font-bold mt-2 text-zinc-900 dark:text-white">
          {user_.name}
        </h2>

        <a href={user_.html_url} target="_blank" rel="noopener noreferrer">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm italic font-medium">
            @{user_.login}
          </p>
        </a>

        {user_.bio && (
          <p className="mt-2 text-sm text-center text-zinc-600 dark:text-zinc-300 px-2">
            {user_.bio}
          </p>
        )}

        {user_.location && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            📍 {user_.location}
          </p>
        )}

        <div className="flex justify-around w-full mt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-800 dark:text-white">
              {user_.public_repos}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Repos</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-800 dark:text-white">
              {user_.followers}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageProfile;
