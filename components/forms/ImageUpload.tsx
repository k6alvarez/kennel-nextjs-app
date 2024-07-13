import { Button } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const ImageUpload = ({
  name,
  defaultInputValues,
}: {
  name: string;
  defaultInputValues?: any;
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([
    ...(defaultInputValues && defaultInputValues[name]
      ? defaultInputValues[name].split(",")
      : []),
  ]);

  return (
    <>
      <input
        defaultValue={(defaultInputValues && defaultInputValues[name]) || ""}
        id={name}
        name={name}
        type={"text"}
        className="mt-1 block w-full appearance-none rounded-md px-3 py-2 placeholder-gray-400 text-primary shadow-sm sm:text-sm"
      />
      {imageUrls.map((url: string) => (
        <div className="bg-black opacity-30 p-2 rounded-md my-2" key={url}>
          <img key={url} src={url} alt={name} className="w-full h-auto" />
        </div>
      ))}
      <CldUploadWidget
        uploadPreset="gk-app"
        options={{
          resourceType: "image",
          sources: ["local", "camera", "dropbox", "google_drive"],
        }}
        onSuccess={(result, { widget }) => {
          if (typeof result.info === "object") {
            const secure_url = result.info.secure_url || "";
            const input = document.querySelector(`input[name=${name}]`);

            const currentValue = input?.getAttribute("value");

            if (currentValue === "") {
              if (input) {
                input.setAttribute("value", secure_url);
                // setImageUrls([secure_url]);
              }
            } else {
              const currentValues = currentValue?.split(",");
              if (currentValues) {
                const newValues = [...currentValues, secure_url];
                if (input) {
                  input.setAttribute("value", newValues.join(","));
                  //   setImageUrls(newValues);
                }
              }
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              htmlType="button"
              type="primary"
              size="small"
              className="capitalize mt-2 w-max"
              onClick={() => open()}
            >
              Upload Image for {name}
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
