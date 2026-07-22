import Eyebrow from "./Eyebrow";

const lines = [
  "You own the experience.",
  "You control the workflow.",
  "You build on your brand.",
  "You create for your future.",
];

export default function BrandStatement() {
  return (
    <section className="bg-cream py-24 md:py-32 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <Eyebrow>Your business. Your platform. Your brand.</Eyebrow>
        <h2 className="font-display text-3xl md:text-5xl text-ink text-balance">
          Why keep paying for tools that don&apos;t fully fit your business?
        </h2>
        <div className="mt-12 space-y-3">
          {lines.map((line) => (
            <p
              key={line}
              className="font-display italic text-xl md:text-2xl text-plum"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-10 text-ink/50">
          One platform. Built specifically for you.
        </p>
      </div>
    </section>
  );
}
