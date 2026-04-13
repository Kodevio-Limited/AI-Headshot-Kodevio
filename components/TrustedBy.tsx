const companies = [
  { name: "Chase", width: 100, height: 40 },
  { name: "Columbia University", width: 60, height: 50 },
  { name: "Kraft Heinz", width: 100, height: 16 },
  { name: "Lean Solutions", width: 60, height: 32 },
  { name: "ERA Group", width: 62, height: 40 },
  { name: "Juniper Square", width: 62, height: 26 },
  { name: "PragerMetis", width: 80, height: 38 },
  { name: "Masterschool", width: 100, height: 40 },
  { name: "Nationwide", width: 80, height: 44 },
  { name: "OpenGov", width: 90, height: 26 },
];

export default function TrustedBy() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-medium text-gray-500">
          Trusted by over <span className="font-bold text-black">2,477,000</span> professionals and teams. <span className="font-bold text-black">43,618,000+</span> photos generated.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
          {companies.map((co) => (
            <div key={co.name} className="flex items-center justify-center rounded bg-gray-200 px-4 py-2">
              <span className="text-xs font-semibold text-gray-600">{co.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
