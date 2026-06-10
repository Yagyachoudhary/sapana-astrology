import Link from 'next/link';
import { getPosts } from '@/lib/queries';

export const revalidate = 60;

export const metadata = {
  title: 'Blog — Sapana Astrology',
  description: 'Articles on astrology, tarot and palmistry by Sapana.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="eyebrow">The journal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Articles & insights</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-cocoa-700 sm:text-base">
          Learn astrology and tarot through practical, fear-free writing.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-sm border border-cream-200 transition hover:shadow-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.cover_image}
              alt={p.title}
              className="h-52 w-full object-cover transition group-hover:scale-105"
            />
            <div className="p-6">
              <p className="text-xs text-cocoa-700">
                {p.author} ·{' '}
                {new Date(p.published_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
              <h2 className="mt-2 text-2xl leading-snug group-hover:text-terracotta-600">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-cocoa-700">{p.excerpt}</p>
              <span className="link-underline mt-4 inline-block">Read article</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
