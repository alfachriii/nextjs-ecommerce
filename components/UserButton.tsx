"use client";

import { UserData } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import dummyProfile from "@/images/dummy_profile.webp";
import Separator from "./ui/separator";
import { PiSignOut } from "react-icons/pi";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Loading from "./Loading";

const UserButton = () => {
   const [isUserModal, setIsUserModal] = useState<boolean>(false);
   const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
   const [userData, setUserData] = useState<UserData>();

   const handleLogout = async () => {
      setLogoutLoading(true);
      await logout();
      localStorage.removeItem("user");
      localStorage.removeItem("cartStore")
      setLogoutLoading(false);
      redirect("/");
   };

   useEffect(() => {
      const fetchUserData = async () => {
         const savedData = localStorage.getItem("user");

         if (savedData) {
            const parsedUserData = JSON.parse(savedData);

            return setUserData({
               email: parsedUserData?.email,
               profileUrl: parsedUserData?.profileUrl,
            });
         }

         if (!savedData) {
            console.log("fetch user data");
            try {
               const res = await fetch("api/auth/me");
               if (res.ok) {
                  const data = await res.json();

                  localStorage.setItem("user", JSON.stringify(data));

                  return setUserData(data);
               }
            } catch (error) {
               console.log("failed to get userData: ", error);
            }
         }
      };
      fetchUserData();
   }, []);

   return (
      <>
         {logoutLoading && <Loading />}
         <div
            className="aspect-w-1 aspect-h-1 w-8 rounded-full hover:cursor-pointer"
            onClick={() => setIsUserModal(true)}
         >
            <Image
               src={userData?.profileUrl ?? dummyProfile}
               alt={userData?.email || "profile"}
               className="w-full object-cover rounded-full"
               width={30}
               height={30}
            />
         </div>
         {isUserModal && (
            <>
               <div className="absolute z-50 top-10 right-0 bg-background border-2 border-secondary-foreground/30 flex flex-col rounded-lg rounded-tr-none">
                  <div className="flex gap-4 items-center p-4 pr-16">
                     <div className="aspect-w-1 aspect-h-1 w-10 rounded-full">
                        <Image
                           src={userData?.profileUrl ?? dummyProfile}
                           alt={userData?.email || "profile"}
                           className="w-full object-cover rounded-full"
                           width={30}
                           height={30}
                        />
                     </div>
                     <p>{userData?.email}</p>
                  </div>
                  <Separator />
                  <button
                     className="flex gap-4 p-4 items-center hover:cursor-pointer group"
                     onClick={handleLogout}
                     disabled={logoutLoading}
                  >
                     <PiSignOut className="text-xl group-hover:text-chart-1" />
                     <p className="text-secondary-foreground group-hover:text-chart-1">
                        Sign Out
                     </p>
                  </button>
               </div>
               <div
                  className="fixed z-40 w-screen h-screen top-0 right-0 p-8"
                  onClick={() => setIsUserModal(false)}
               ></div>
            </>
         )}
      </>
   );
};

export default UserButton;
