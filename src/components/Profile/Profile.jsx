import { Outlet } from "react-router-dom";

import "./Profile.css";

import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleItemCardClick, clothingItems, handleAddClick }) {
  return (
    <main className="profile">
      <Sidebar />
      <ClothesSection
        handleAddClick={handleAddClick}
        handleItemCardClick={handleItemCardClick}
        clothingItems={clothingItems}
      />
      <Outlet />
    </main>
  );
}

export default Profile;
