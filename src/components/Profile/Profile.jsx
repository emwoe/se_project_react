import { Outlet } from "react-router-dom";

import "./Profile.css";

import Sidebar from "../Sidebar/sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleItemCardClick, clothingItems }) {
  return (
    <main className="profile">
      <Sidebar />
      <ClothesSection
        handleItemCardClick={handleItemCardClick}
        clothingItems={clothingItems}
      />
      <Outlet />
    </main>
  );
}

export default Profile;
