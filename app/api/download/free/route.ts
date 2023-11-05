import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: "722715439896812",
  api_secret: "Z5TkJhyovDs_v_crdvZkhcSi69s",
});
