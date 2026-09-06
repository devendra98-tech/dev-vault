import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceDetail } from "@/components/resources/resource-detail";
import { RelatedResources } from "@/components/resources/related-resources";
import {
  getRelatedResources,
  getResourceBySlug,
} from "@/data/resources";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found",
    };
  }

  const title = `${resource.title} — PDF`;
  const description = resource.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      title: `${resource.title} — PDF | DevVault`,
      description,
      url: `/resources/${resource.slug}`,
      type: "article",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} — PDF | DevVault`,
      description,
    },
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const related = await getRelatedResources(resource, 3);

  return (
    <div className="container-page space-y-12 py-10 sm:py-14">
      <ResourceDetail resource={resource} />
      <RelatedResources resources={related} />
    </div>
  );
}
