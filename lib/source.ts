import { guides, resources } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';

export const guidesSource = loader({
  baseUrl: '/guides',
  source: guides.toFumadocsSource(),
});

export const resourcesSource = loader({
  baseUrl: '/resources',
  source: resources.toFumadocsSource(),
});
