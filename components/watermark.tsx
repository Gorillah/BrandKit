import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

type logo = {
  logoId: string;
  companyName: string;
  logoUrl: string;
  logoPublicId: string;
  logoFormat: string;
};

type Subscription = {
  isSub: boolean;
};

export function WatermarkLogo({
  logoUrl,
  companyName,
  logoPublicId,
}: logo & Subscription): JSX.Element {
  const router = useRouter();
  if (logoUrl.length === 0) router.push("/");
  return (
   
  );
}

export default WatermarkLogo;
