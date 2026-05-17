import path from "node:path";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]]],
  },
});

export default withMDX(nextConfig);
