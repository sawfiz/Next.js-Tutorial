'use client';
import React, { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState('');
  console.log("🚀 ~ file: page.tsx:11 ~ UploadPage ~ publicId:", publicId)

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={120}
          alt={'image'}
        ></CldImage>
      )}

      {/* Create the uploadPreset on cloudinary.com */}
      <CldUploadWidget
        uploadPreset="axrmqflc"
        options={{
          sources:['local'],
          multiple: false,
        }}
        onUpload={(result, widget) => {
          console.log(result);
          if (result.event != 'success') return;
          const info = result.info as CloudinaryResult;
          console.log("🚀 ~ file: page.tsx:31 ~ UploadPage ~ info:", info)
          setPublicId(info.public_id);
        }}
      >
        {/* children of the component */}
        {({ open }) => {
          return (
            <button className="btn btn-primary" onClick={() => open()}>
              Upload
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
