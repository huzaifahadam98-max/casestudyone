import { getPostData, getAllPostSlugs } from '@/lib/markdown';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  return {
    title: `${postData.title} - Nomad AI`,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  return (
    <article className="py-20 md:py-28 max-w-3xl mx-auto px-6">
      <div className="mb-8 mt-10 text-center">
        <Link href="/blog" className="text-sm font-semibold text-accent hover:text-accenthover uppercase tracking-wider mb-8 inline-block">
          &larr; Back to Field Notes
        </Link>
        <p className="text-textmuted text-sm mb-2">{postData.date} &bull; {postData.category || 'Note'}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-textmain leading-tight mb-6">{postData.title}</h1>
      </div>
      
      <div 
        className="prose prose-lg prose-slate max-w-none text-textmain prose-a:text-accent hover:prose-a:text-accenthover prose-headings:text-textmain"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
    </article>
  );
}
