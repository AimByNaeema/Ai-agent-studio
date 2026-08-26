import { useEffect } from 'react';

interface PageMetadataOptions {
  title: string;
  description: string;
}

export function usePageMetadata({ title, description }: PageMetadataOptions) {
  useEffect(() => {
    // Update document title
    const fullTitle = title.includes('AI AGENT STUDIO')
      ? title
      : `${title} | AI AGENT STUDIO`;
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Scroll to top of window on page mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description]);
}
