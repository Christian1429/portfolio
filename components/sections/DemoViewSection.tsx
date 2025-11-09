import { defineQuery } from 'next-sanity';
import { AnimatedDemoView } from '@/components/ui/animated-demoview';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';

const DEMOVIEW_QUERY =
  defineQuery(`*[_type == "demoview" && featured == true] | order(order asc){
  name,
  position,
  company,
  content,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export async function DemoViewSection() {
  const { data: demoviews } = await sanityFetch({
    query: DEMOVIEW_QUERY,
  });

  if (!demoviews || demoviews.length === 0) {
    return null;
  }
  // Map Sanity demoviews to AnimatedDemoView format
  const formattedDemoViews = demoviews.map((demoview: any) => ({
    quote: demoview.content || '',
    name: demoview.name || '',
    designation: demoview.company
      ? `${demoview.position} at ${demoview.company}`
      : demoview.position || '',
    // Use avatar for the main image
    src: demoview.avatar
      ? urlFor(demoview.avatar).width(800).height(800).url()
      : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    // Pass company logo separately to show next to name
    companyLogo: demoview.companyLogo
      ? urlFor(demoview.companyLogo).width(32).height(32).url()
      : undefined,
  }));

  return (
    <section id="demoview" className="py-20 px-6 min-h-[910px]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Project previews
          </h2>
          <p className="text-xl text-muted-foreground">
            A sight into my projects
          </p>
        </div>

        <AnimatedDemoView demoviews={formattedDemoViews} autoplay={true} />
      </div>
    </section>
  );
}

