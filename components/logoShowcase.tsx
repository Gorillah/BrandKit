import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

const LogoShowcaseArray = [
  "/fontShowcase/9834504_167.jpg",
  "/fontShowcase/9950635_946.jpg",
  "/fontShowcase/11827540_4839823.jpg",
  "/fontShowcase/17351160_BWI870.jpg",
  "/fontShowcase/21145832_9.jpg",
  "/fontShowcase/banana.jpg",
];

export default function LogoShowcase() {
    return (
      <div className="container grid grid-cols-2 md:grid-cols-3 gap-4"> 
        {LogoShowcaseArray.map((src, index) => (
          <div key={index}>
            <AspectRatio ratio={1 / 1}>
              <Image 
                src={src}
                alt={"Logo"}
                fill
                className={index % 2 === 0 ? 'col-span-2' : 'col-span-2 row-start-2'} 
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    )
  }
