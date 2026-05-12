import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

export const metadata = {
  title: "Field Notes - Nomad AI",
  description: "Documenting the trials and errors of self-sufficiency.",
};

export default function BlogList() {
  const posts = getSortedPostsData();

  return (
    <section className="py-20 md:py-28 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 mt-10">
          <h2 className="text-accent text-sm font-bold tracking-widest uppercase mb-4 fade-in-up is-visible">Field Notes</h2>
          <p className="text-3xl md:text-4xl font-bold text-textmain max-w-2xl mx-auto fade-in-up is-visible" style={{ transitionDelay: '100ms' }}>
            Documenting the trials and errors of self-sufficiency.
          </p>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center text-textmuted text-lg mt-20">
            No field notes planted yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                <div 
                  className="card bg-card border border-borderline hover:border-accent p-8 rounded-xl flex flex-col h-full transform transition-all hover:-translate-y-2 hover:shadow-xl fade-in-up is-visible"
                  style={{ transitionDelay: `${200 * (index % 2 + 1)}ms` }}
                >
                  <div className="flex-grow">
                    <p className="text-accent font-semibold uppercase text-xs tracking-wider">{post.category || 'Note'}</p>
                    <h3 className="text-2xl font-bold text-textmain mt-2 mb-4">{post.title}</h3>
                    <p className="text-textmuted">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-borderline pt-4">
                    <span className="text-sm font-medium text-textmuted">{post.date}</span>
                    <span className="font-semibold text-accent group-hover:text-accenthover transition-colors">Read Note &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
