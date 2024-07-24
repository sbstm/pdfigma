"use client";
import { getLoggedInUser } from "@/lib/actions/user.action";
import { Avatar } from "@radix-ui/react-avatar";
import { get } from "http";
import React, { use, useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "./ui/card";
import Setting from "./Setting";

const Profile = () => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUser();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-container p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">Profile</CardTitle>
        </CardHeader>
        {user && (
          <CardContent className="flex flex-col items-center">
            <div className="user-avatar mb-4">
              {user.photoURL ? (
                <Avatar className="avatar-image">
                  <AvatarImage src={user.photoURL} alt={user.name} />
                </Avatar>
              ) : (
                <Avatar className="avatar-image">
                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase() || "-"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="user-details text-center">
              <p className="text-lg"><strong>Nama:</strong> {user.name}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
              <p className="text-lg"><strong>Kelas:</strong> {user.kelas}</p>
              <p className="text-lg"><strong>Alamat:</strong> {user.address}</p>
            </div>
          </CardContent>
        )}
      </Card>
      <Setting />
    </div>
  );
};

export default Profile;
