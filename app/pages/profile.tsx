import { useRouter } from "expo-router";
import React from "react";
import { useUser } from "@/context/UserContext";
import ProfilePage from "@/components/ProfilePage";

export default function ProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  const handleEditProfile = () => {
    router.push("/profile-pages/edit-profile");
  };

  const handleSettings = () => {
    router.navigate("/profile-pages/settings");
  };

  return (
    <ProfilePage
      user={user}
      handleEditProfile={handleEditProfile}
      handleSettings={handleSettings}
    />
  );
}
