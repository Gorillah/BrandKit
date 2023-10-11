// import React from "react";
// import LogoNavbar from "@/components/LogoNavbra";
// import Logo from "@/components/Logo";
// import axios from "axios";
// import { toast } from "@/components/ui/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { logos } from "@/db/schema";
// import { eq, and } from "drizzle-orm";

// type logo = {
//   logoId: string;
//   companyName: string;
//   logoUrl: string;
//   logoPublicId: string;
//   logoFormat: string;
//   userId: string;
//   isSub: boolean;
// };

// export default function LogoMain({ logoId, userId, isSub }: logo) {
//   const getLogo = useMutation({
//     mutationFn: async (logoId: string) => {
//       const logoSelect = await db
//         .select()
//         .from(logos)
//         .where(
//           and(
//             eq(logos.id, parseInt(logoId)), // Id matches
//             eq(logos.userId, userId) // Created by current user
//           )
//         );
//       return logoSelect;
//     },
//   });

//   getLogo.mutate(logoId, {
//     onSuccess: () => {
//       // uploadToFirebase.mutate(id);
//     },
//     onError: (error: any) => {
//       toast({
//         title: "Failed to load logo",
//         description: error.message,
//         duration: 3000,
//       });
//       console.log(error);
//     },
//   });
//   return (
//     <div>
   
//     </div>
//   );
// }
