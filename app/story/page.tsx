// app/story/page.tsx
// “Our Story” page with:
// - Soft Sky header panel
// - Text sections describing your story
// - Responsive image carousel (preserves aspect ratios)
// - Uses Bootstrap grid utilities + Next/Image optimization
import Image from 'next/image'
import ImageCarousel from '@/components/ImageCarousel'


export default function OurStoryPage() {
  return (
    <main className="container py-5" style={{ maxWidth: 1000 }}>
      {/* Soft banner using Sky */}
      <header className="mb-4">
        <h1
          className="h1 text-navy mb-1 font-script text-center"
          style={{ fontSize: '4rem', lineHeight: 1.1 }}
        >
          Our Story
        </h1>
      </header>
      <div className="divider-coral mb-3"></div>

      {/* Hero image */}
      <figure className="mb-4">
        <Image
        src="/images/ivy-adrian-our-story.jpg"
        alt="Ivy & Adrian's Engagement"
        width={3072}
        height={4080}
        className="rounded-2 w-100"
        style={{ height: 'auto' }}
        priority
        />
      </figure>

      {/* Sections */}
      <section className="border rounded border-forest mb-4 bg-sky p-3 h-100">
        <h2 className="h5 text-navy">How We Met</h2>
        <p>We met in the summer of 2021, when Ivy started working in the same department as Adrian at Dotdash (now People, Inc.). Ivy likes to say we met at work. Adrian likes to say we met online. Technically, since the work was completely remote at the time, both are true. After a few “water-cooler Zoom chats” on late Tuesdays afternoons that our entire team was invited to, but only we attended, we eventually met in person in the fall of that year and went on our first date at the Museum of the City of New York - learning more about the city that would become the backdrop of our love.</p>
      </section>

      <section className="border rounded border-forest mb-4 bg-sky p-3 h-100">
        <h2 className="h5 text-navy">Building Our Relationship</h2>
        <p>As seasons turned into years, long train trips and bike rides across Brooklyn shortened with each successive move into closer — and eventually the same — apartments. Along the way, we shared a trip around the world, countless meals, laughs, and lively conversations!</p>
      </section>

      <section className="border rounded border-forest mb-4 bg-sky p-3 h-100">
        <h2 className="h5 text-navy">The Proposal</h2>
        <p>Ever since we met, Adrian expressed his dream of being proposed to. Ivy did as well. So naturally, we decided why not do both? To celebrate the beginning of summer, we took a quiet trip to Lake George, NY. No one knew we were planning to get engaged. On June 20, Ivy — while seated — proposed to Adrian on a balcony overlooking the lake at our bed & breakfast. The next day Adrian — on one knee — proposed to Ivy at the top of Prospect Mountain.</p>
      </section>
      <div className="divider-coral mb-3"></div>
      <section className="border rounded border-forest mb-4 bg-sky p-3 h-100">
        <p>We have been so fortunate to find solace, support, and joy in each other&#39;s company. In the last four years we have shared countless travels, apartments, and cities as our relationship has blossomed and fortified. During our time together, we have cultivated a wonderful and supportive community of both family and friends whom we treasure dearly. We can&#39;t wait to take this next step as a couple and start the rest of our lives together. Thank you for being a part of our story and we are looking forward to celebrating this moment with you!</p>
      </section>

      {/* ===== Image Carousel ===== */}
      {/* 
        Replace these sample filenames with actual images you’ve placed under /public/images/.
        The carousel preserves each image’s aspect ratio and adapts to mobile/desktop screens.
      */}
      <ImageCarousel
        className="mb-5"
        showCaptions
        slides={[
          { src: '/images/ivy-adrian-engagement-1.jpg', alt: 'Getting engaged in Lake George', captionText: 'Getting engaged in Lake George'},
          { src: '/images/ivy-adrian-amsterdam.jpg', alt: 'Vacationing in Amsterdam', captionText: 'Vacationing in Amersterdam' },
          { src: '/images/ivy-adrian-rail-bike.jpg', alt: 'Rail biking by the Hudson River', captionText: 'Rail biking by the Hudson River' },
          { src: '/images/ivy-adrian-india.jpg', alt: 'At the Taj Mahal', captionText: 'At the Taj Mahal' },
          { src: '/images/ivy-adrian-subway.jpg', alt: 'On the NYC Subway', captionText: 'On the NYC Subway' },
          { src: '/images/ivy-adrian-engagement-2.jpg', alt: 'On a boat cruise of Lake George', captionText: 'On a boat cruise of Lake George' },
          { src: '/images/ivy-adrian-india-2.jpg', alt: 'On a rickshaw ride in Delhi', captionText: 'On a rickshaw ride in Delhi' },
          { src: '/images/ivy-adrian-karaoke.jpg', alt: 'A night out at karaoke', captionText: 'A night out at karaoke' },
        ]}
      />

      <p className="text-center text-muted">
        More memories from our journey together.
      </p>
    </main>
  )
}
