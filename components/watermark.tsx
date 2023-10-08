import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import useDownloader from "react-use-downloader";
import { useRouter } from "next/navigation";
import axios from "axios";

type result = {
  logoUrl: string;
  companyName: string;
  isPaid: number;
  logoId: string;
};

export function WatermarkLogo({
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

  const handlePayment = async () => {
    try {
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
    }
  };

  return (
    <div>
      <div>
        {url.includes("http://res.cloudinary.com") && (
          <div>
            <CldImage width={500} height={500} src={id} alt="test" priority />
            <div className="flex gap-2 justify-center">
              <Button onClick={() => download(logoUrl, companyName + ".jpg")}>
                Download Free
              </Button>
              <Button onClick={handlePayment} disabled>
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
