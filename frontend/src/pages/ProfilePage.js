import React from "react";

import Profile from "../components/Profile/Profile";
import Tabs from "../components/Profile/Tabs";
function ProfilePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
      <Tabs className="md:col-span-1 lg:col-span-1" />
      <Profile className="md:col-span-3 md:px-6 lg:col-span-4" />
    </div>
  );
}

export default ProfilePage;
