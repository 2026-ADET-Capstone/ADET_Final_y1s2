export default function AboutSection() {
  return (
    <section className="bg-[#f5f5f5] py-16 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-[#1a2a4a] tracking-[0.25em] text-center mb-12">
          About Moonlight Motion
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src="/assets/MM_LoginPicureFull.png"
              alt="Moonlight Drive-In Theatre entrance at night"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              Moonlight Motion is your destination for movies under the stars.
              Blending the nostalgia of classic drive-in theaters with a modern
              experience, we bring communities together for unforgettable nights
              of film, food, and atmosphere.
            </p>
            <p>
              From the moment you arrive, Moonlight Motion is designed to feel
              effortless. Browse upcoming movies, plan your visit, and enjoy a
              relaxed, open-air environment where you can watch from the comfort
              of your own vehicle. Whether it&apos;s a family night, a date, or
              just a reason to get out, every showing is built around creating a
              memorable experience.
            </p>
            <p>
              Our drive-in isn&apos;t just about watching movies&mdash;it&apos;s
              about the feeling. The glow of the screen against the night sky,
              the sound tuned through your radio, and the shared excitement of a
              crowd enjoying something together. It&apos;s a return to a simpler
              kind of entertainment, reimagined for today.
            </p>
            <p className="text-[#1a2a4a] font-medium">
              At Moonlight Motion, every night is a chance to slow down, look
              up, and enjoy the show.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}