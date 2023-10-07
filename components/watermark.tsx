import { CldImage } from "next-cloudinary";

export function WatermarkImage({logoUrl}: any): JSX.Element {

  return (
      <CldImage
        deliveryType="fetch"
        width={500}
        height={500}
        src={logoUrl}
        alt="test"
        loading="lazy"
        blur="30"
      />
  );
}

export default WatermarkImage;
