import LogoShowcase from "@/components/Homepage/logoShowcase";
import Footer from "@/components/Layouts/Footer";
import PriceTable from "@/components/Homepage/PriceTable";
import Faq from "@/components/Homepage/Faq";
import CreateLogoForm from "@/components/Homepage/CreateLogoForm";
import Advantages from "@/components/Homepage/Advantages";
import { auth } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-10 gap-8 md:gap-15">
      <CreateLogoForm />
      <LogoShowcase />
      <Advantages />
      <Faq />
      <PriceTable />
      <Footer />
    </div>
  );
}
