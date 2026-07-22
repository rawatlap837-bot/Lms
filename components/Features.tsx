import Eyebrow from "./Eyebrow";
import { features } from "@/data/content";

export default function Features() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow>More than an LMS</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
            A digital infrastructure built for your business.
          </h2>
          <p className="mt-6 text-ink/60 leading-relaxed">
            We don&apos;t simply give you another software subscription. We
            build a custom digital platform that connects your students,
            team, content, and operations in one place.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/5 rounded-2xl overflow-hidden">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-cream p-7 hover:bg-white transition-colors">
              <Icon className="h-5 w-5 text-plum" strokeWidth={1.6} />
              <h3 className="font-display text-base text-ink mt-4">{title}</h3>
              <p className="mt-2 text-sm text-ink/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
