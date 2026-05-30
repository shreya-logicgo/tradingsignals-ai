import { redirect } from "next/navigation";

// DISABLED: Generate-blog page is not deployed on the public landing site.
// Re-enable the commented block below when CMS / admin features are needed again.

export default function GenerateBlogPage() {
  redirect("/blogs");
}

/*
import GenerateBlog from "@/components/generate-blog";
import React from "react";

const GenerateBlogPage = () => {
  return (
    <div className="lg:mt-24 mt-10">
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-350 mx-auto">
        <GenerateBlog />
      </div>
    </div>
  );
};

export default GenerateBlogPage;
*/
