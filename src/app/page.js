"use client";
import React, { useState } from "react";
import PageProfile from "./Components/PageProfile";
import Followers from "./Components/Followers";
import UserRepositories from "./Components/UserRepositories";
import GitHubUserSearch from "./Components/GitHubUserSearch";

export default function Home() {
  const [username, setUsername] = useState("john-papani"); 
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <div className="min-h-[95vh]">
   
      <GitHubUserSearch onUsernameChange={setUsername} />

      <div className="flex flex-row flex-wrap justify-center items-start gap-5 mt-5 md:mt-10 pb-5">
        <div className="w-full md:w-1/4 flex flex-col items-center gap-5 mx-auto">
          <PageProfile username={username} setNotFound={setNotFound} setUser={setUser}/>
          <Followers username={username} notFound={notFound} user={user}/>
        </div>

        <UserRepositories username={username} notFound={notFound} user={user}/>
      </div>
    </div>
  );
}
