"use client";
import React, { useState } from "react";

export default function GitHubUserSearch({ onUsernameChange }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setError("");
      onUsernameChange(username.trim());
    } else {
      setError("Please enter a GitHub username.");
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center pt-2 px-4">
      <p className="text-gray-300 text-center mb-3 text-sm">
        Enter a GitHub username to explore their profile, repositories, and
        followers.
      </p>

      <form onSubmit={handleSubmit} className="flex max-w-md items-center">
        <label htmlFor="github-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-zinc-400 dark:text-zinc-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="github-search"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border ${
              error ? "border-red-500" : "border-zinc-300 dark:border-zinc-600"
            } focus:ring-blue-500 focus:border-blue-500 dark:placeholder-zinc-400`}
            placeholder="e.g. john-papani"
          />
        </div>
        <button
          type="submit"
          className="ml-2 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
