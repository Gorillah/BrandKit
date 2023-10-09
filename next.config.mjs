import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // your Next.js config
};

export default withPlaiceholder({
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
