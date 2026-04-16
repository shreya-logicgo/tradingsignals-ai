import BlogDetailPage from "@/components/Blogs/BlogDetailPage";
import NoiseOverlay from "@/components/NoiseOverlay";
import StartToday from "@/components/sections/starttoday/Starttoday";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div className="bg-[#010B24] lg:mt-24 mt-10 ">
      <NoiseOverlay/>
      <BlogDetailPage params={resolvedParams as any} />
      <StartToday/>
    </div>
  );
};

export default BlogDetails;