import BlogDetailPage from "@/components/Blogs/BlogDetailPage";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div className="lg:mt-24 mt-10">
      <BlogDetailPage params={resolvedParams as any} />
    </div>
  );
};

export default BlogDetails;