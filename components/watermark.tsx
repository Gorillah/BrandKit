import useDownloader from "react-use-downloader";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type result = {
  logoUrl: string;
  companyName: string;
  isPaid: number;
  logoId: string;
  isSub: boolean;
};

export function WatermarkLogo({
  isSub,
  logoId,
  logoUrl,
  companyName,
  isPaid,
}: result): JSX.Element {
  const { download } = useDownloader();
  const router = useRouter();
  let url = logoUrl;
  let id = "";
  if (logoUrl.length === 0) router.push("/");
  if (url.includes("http://res.cloudinary.com")) {
    const regex = /\/logos\/(.*)/;
    const match = url.match(regex);
    const s1 = match[0].split(".png")[0];
    id = s1.substring(1);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      if (!isSub) {
        const res = await axios.get("/api/stripe");
        window.location.href = res.data.url;
      }
      console.log("downloading");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        {url.includes(
          "http://res.cloudinary.com" ||
            "https://res.cloudinary.com" ||
            "res.cloudinary"
        ) && (
          <div>
            <CldImage
              sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
              src={id}
              alt="test"
              priority
            />
            <div className="flex gap-2 justify-center">
              <Button onClick={() => download(logoUrl, companyName + ".jpg")}>
                Download Free
              </Button>
              <Button onClick={handlePayment} disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />}
                Download Premium
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatermarkLogo;
