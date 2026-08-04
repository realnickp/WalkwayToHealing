import Image from 'next/image'
import { StaggerContainer, StaggerItem, AnimatedSection } from '@/components/shared/AnimatedSection'
import { YouTubeEmbed } from '@/components/shared/YouTubeEmbed'
import { GoogleReviewsCarousel } from '@/components/home/GoogleReviewsCarousel'
import { storiesOfHealingVideos, meetTheStaffVideos, youtubeChannelUrl } from '@/config/videos'

function GroupHeading({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) {
  return (
    <AnimatedSection className="text-center mb-10">
      <h3 id={id} className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
        {title}
      </h3>
      <p className="text-primary-200 text-sm sm:text-base max-w-xl mx-auto">{description}</p>
    </AnimatedSection>
  )
}

export function TestimonialsSection() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-pathway.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-900/90" />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto relative z-10">
        <AnimatedSection className="text-center mb-14">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Voices of Recovery
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 text-balance"
          >
            People just like you have found a way forward.
          </h2>
          <p className="text-primary-200 text-base max-w-xl mx-auto">
            Real clients, real staff, real reviews — in their own words.
          </p>
        </AnimatedSection>

        {/* Stories of Healing */}
        <div aria-labelledby="stories-of-healing-heading">
          <GroupHeading
            id="stories-of-healing-heading"
            title="Stories of Healing"
            description="Clients share what recovery at Walkway to Healing has meant for their lives."
          />
          <StaggerContainer className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {storiesOfHealingVideos.map((video) => (
              <StaggerItem
                key={video.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <YouTubeEmbed
                  videoId={video.id}
                  title={`Stories of Healing: ${video.person}`}
                  description={video.description}
                />
                <p className="text-white text-sm font-medium mt-3 text-center">
                  {video.person}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Meet the Staff */}
        <div aria-labelledby="meet-the-staff-heading" className="mt-16 md:mt-20">
          <GroupHeading
            id="meet-the-staff-heading"
            title="Meet the Staff"
            description="The people who will walk beside you — many of them in recovery themselves."
          />
          <StaggerContainer className="flex flex-wrap justify-center gap-5">
            {meetTheStaffVideos.map((video) => (
              <StaggerItem
                key={video.id}
                className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
              >
                <YouTubeEmbed
                  videoId={video.id}
                  title={`Meet the Staff: ${video.person}`}
                  role={video.role}
                  description={video.description}
                />
                <p className="text-white text-sm font-medium mt-3 text-center">
                  {video.person}
                </p>
                {video.role && (
                  <p className="text-white text-xs mt-0.5 text-center">{video.role}</p>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="text-center mt-8">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-200 text-sm underline underline-offset-4 hover:text-white transition-colors"
            >
              Watch more on our YouTube channel
            </a>
          </AnimatedSection>
        </div>

        {/* Google reviews */}
        <div aria-labelledby="google-reviews-heading" className="mt-16 md:mt-20">
          <GroupHeading
            id="google-reviews-heading"
            title="What Our Clients Say on Google"
            description="Five-star reviews, quoted word for word from our public Google listing."
          />
          <GoogleReviewsCarousel />
        </div>

        <AnimatedSection delay={0.2} className="text-center mt-14">
          <a
            href="/intake"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-primary-50 transition-colors duration-150 shadow-lg"
          >
            Your story can start today
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
