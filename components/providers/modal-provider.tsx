"use client";

import React, { useEffect } from "react";
import UploadImageModal from "../modals/upload-image-modal";
import ProfileDetailsModal from "../modals/profile-details-modal";
import CreateRecipeModal from "../modals/create-recipe-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <>
        <UploadImageModal />
        <ProfileDetailsModal />
        <CreateRecipeModal />
      </>
    );
  }
};

export default ModalProvider;
