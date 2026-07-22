export default function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`font-mono text-xs tracking-[0.25em] uppercase mb-4 ${
        dark ? "text-lilac" : "text-plum"
      }`}
    >
      {children}
    </p>
  );
}
