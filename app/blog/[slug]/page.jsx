import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/queries';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article not found' };
  return { title: `${post.title} — Sapana Astrology`, description: post.excerpt };
}

/** Minimal renderer: blank-line separated paragraphs, **bold** as subheading. */
function renderContent(content) {
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    const heading = trimmed.match(/^\*\*(.+)\*\*$/);
    if (heading) {
      return (
        <h2 key={i} className="mt-10 text-2xl">
          {heading[1]}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-5 leading-relaxed text-cocoa-800">
        {trimmed}
      </p>
    );
  });
}

export default async function ArticlePage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm text-terracotta-600 hover:underline">
        ← All articles
      </Link>

      <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-cocoa-700">
        By {post.author} ·{' '}
        {new Date(post.published_at).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.cover_image}
        alt={post.title}
        className="mt-8 h-72 w-full rounded-sm object-cover sm:h-96"
      />

      <div className="mt-8 text-base">{renderContent(post.content)}</div>

      <div className="mt-14 rounded-sm bg-cream-100 p-8 text-center">
        <h2 className="text-2xl">Want a personal reading?</h2>
        <p className="mt-2 text-sm text-cocoa-700">
          Book a one-on-one consultation with Sapana.
        </p>
        <Link href="/booking" className="btn-primary mt-6">
          Book Consultation
        </Link>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}
