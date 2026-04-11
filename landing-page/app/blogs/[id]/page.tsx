import BlogDetailPage from "@/components/Blogs/BlogDetailPage";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  return (
    <div>
      <BlogDetailPage params={resolvedParams as any} />
    </div>
  );
};

export default BlogDetails;