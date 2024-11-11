import { Outlet } from "react-router-dom";

import "./Profile.css";

import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleItemCardClick,
  clothingItems,

  handleAddClick,
  handleEditClick,
  handleItemLike,
  handleLogout,
  updateIsLiked,
}) {
  return (
    <main className="profile">
      <Sidebar handleEditClick={handleEditClick} handleLogout={handleLogout} />
      <ClothesSection
        handleAddClick={handleAddClick}
        handleItemCardClick={handleItemCardClick}
        clothingItems={clothingItems}
        handleItemLike={handleItemLike}
        updateIsLiked={updateIsLiked}
      />
      <Outlet />
    </main>
  );
}

export default Profile;
