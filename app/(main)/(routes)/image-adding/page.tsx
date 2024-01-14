import ImageDropzone from "@/components/file-upload/image-dropzone";
import React from "react";

const Page = () => {
  return (
    <section className="container mt-6 max-w-lg">
      <ImageDropzone
        accept={{
          "image/png": [],
          "image/jpeg": [],
        }}
      />
    </section>
  );
};

export default Page;
