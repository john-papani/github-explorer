"use client";
import React, { useState, useEffect } from "react";
import PageProfile from "./Components/PageProfile";
import Followers from "./Components/Followers";
import UserRepositories from "./Components/UserRepositories";
import GitHubUserSearch from "./Components/GitHubUserSearch";
import { fetchGitHubUser } from "./Components/utils/helpers";

export default function Home() {
  const [username, setUsername] = useState("john-papani"); 
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const { user_, notFound_ } = await fetchGitHubUser(username);

      setUser(user_);
      setNotFound(notFound_);
    }

    if (username) {
      getUser();
    }
  }, [username]);

  return (
    <div className="min-h-[95vh]">
      <GitHubUserSearch onUsernameChange={setUsername} />

      <div className="flex flex-row flex-wrap justify-center items-start gap-5 mt-5  pb-5">
        <div className="w-full lg:w-1/4 flex flex-col items-center gap-5 mx-auto">
          <PageProfile user={user} username={username} />
          <Followers username={username} notFound={notFound} user={user} />
        </div>

        <UserRepositories username={username} notFound={notFound} user={user} />
      </div>
    </div>
  );
}
