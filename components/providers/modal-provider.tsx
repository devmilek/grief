"use client";

import React, { useEffect } from "react";
import UploadImageModal from "../modals/upload-image-modal";
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
        <CreateRecipeModal />
      </>
    );
  }
};

export default ModalProvider;
