"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");

  const [message, setMessage] = useState("");

  // const handleCreateGroup = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const response = await teams.create(teamId, teamName);
  //     setMessage("Group created successfully!");
  //     console.log("Group created successfully:", response);
  //   } catch (error) {
  //     setMessage("Error creating group. Please try again.");
  //     console.error("Error creating group:", error);
  //   }
  // };

  return (
    <div>
      {/* <form onSubmit={}>
        <div>
          <label htmlFor="teamId">Team ID:</label>
          <input
            type="text"
            id="teamId"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teamName">Team Name:</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Group</button>
      </form>
      {message && <p>{message}</p>} */}
    </div>
  );
};

export default Page;
