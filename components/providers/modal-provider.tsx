"use client";

import React, { useEffect } from "react";
import CreateRecipeModal from "../modals/create-recipe-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <>
        <CreateRecipeModal />
      </>
    );
  }
};

export default ModalProvider;
