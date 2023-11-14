"use client";

import ImageUploadDropzone from "@/components/image-upload-dropzone";
import RecipeDropzone from "@/components/recipe-dropzone";
import React, { useState } from "react";

const TestingPage = () => {
  const [values, setValues] = useState<string[]>([]);
  return (
    <div className="container max-w-2xl pt-10">
      <ImageUploadDropzone
        acceptFiles={{
          "image/png": [".png"],
        }}
        maxFiles={5}
        maxSize={2 * 1024 * 1024}
        values={values}
        setValues={setValues}
      />
      <code>{JSON.stringify(values)}</code>
    </div>
  );
};

export default TestingPage;
