import React from "react";

import Profile from "../components/Profile/Profile";
import Tabs from "../components/Profile/Tabs";
function ProfilePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
      <Tabs />
      <Profile />
    </div>
  );
}

export default ProfilePage;
