import BlogDetailPage from "@/components/Blogs/BlogDetailPage";
import NoiseOverlay from "@/components/NoiseOverlay";
import StartToday from "@/components/sections/starttoday/Starttoday";

const BlogDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  return (
    <div className="bg-[#010B24] lg:mt-24 mt-10 ">
      <NoiseOverlay/>
      {/* We pass the slug to the BlogDetailPage component */}
      <BlogDetailPage />
      <StartToday/>
    </div>
  );
};

export default BlogDetails;
