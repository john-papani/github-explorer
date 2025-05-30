"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function PageProfile({ user, username }) {
  if (!username || !user) {
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
        {user.avatar_url && (
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            <Image
              src={user.avatar_url}
              alt={user.name || "GitHub Avatar"}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full shadow-md hover:scale-105 transition-transform"
            />
          </a>
        )}

        <h2 className="text-xl font-bold mt-2 text-zinc-900 dark:text-white">
          {user.name}
        </h2>

        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm italic font-medium">
            @{user.login}
          </p>
        </a>

        {user.bio && (
          <p className="mt-2 text-sm text-center text-zinc-600 dark:text-zinc-300 px-2">
            {user.bio}
          </p>
        )}

        {user.location && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            📍 {user.location}
          </p>
        )}

        <div className="flex justify-around w-full mt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-800 dark:text-white">
              {user.public_repos}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Repos</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-800 dark:text-white">
              {user.followers}
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
