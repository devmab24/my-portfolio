import { Helmet } from 'react-helmet-async';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '@/lib/site';

interface SeoProps {
  /** Page title, shown as "<title> | devmab". Omit on the homepage to use the default title. */
  title?: string;
  description?: string;
  /** Path of this page, e.g. '/projects/foo'. Used for the canonical URL. */
  path?: string;
  /** Path under public/ or an absolute URL. */
  image?: string;
  type?: 'website' | 'article';
  /** Keep the page out of search results (404s, empty pages). */
  noindex?: boolean;
}

const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}: SeoProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const url = absolute(path);
  const imageUrl = absolute(image);

  return (
    // defer={false}: apply head changes immediately instead of on the next animation
    // frame, so titles/meta update even in background or throttled tabs.
    <Helmet defer={false}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default Seo;
