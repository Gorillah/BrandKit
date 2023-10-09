// layout

import Navbar from "@/components/Navbar";

export default function LogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
