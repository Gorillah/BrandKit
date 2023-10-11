import LogoShowcase from "@/components/logoShowcase";
import Footer from "@/components/Footer";
import PriceTable from "@/components/PriceTable";
import Faq from "@/components/Faq";
import CreateLogoForm from "@/components/CreateLogoForm";
import Advantages from "@/components/Advantages";
import { auth } from "@clerk/nextjs";

export default function HomePage() {
  const { userId } = auth();
  return (
    <div className="flex flex-col space-y-10 gap-4">
      <CreateLogoForm />
      <LogoShowcase />
      <Advantages />
      <Faq />
      <PriceTable />
      <Footer />
    </div>
  );
}
