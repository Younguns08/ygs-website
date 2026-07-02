import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import SplitText from "@/components/SplitText";

/* ————————————————————————————————————————————————————————————
   Homepage — 1:1 rebuild of ygstudio.ca (see reference/screens/home--*.jpg)
   Section order matches the original Framer page top to bottom.
   ———————————————————————————————————————————————————————————— */

const SCHOOL_LOGOS = [
  "school-logo-01.png",
  "school-logo-02.jpg",
  "school-logo-03.jpg",
  "school-logo-04.png",
  "school-logo-05.png",
  "school-logo-06.png",
  "school-logo-07.png",
  "school-logo-08.png",
  "school-logo-09.png",
  "school-logo-10.svg",
];

const FRAMEWORK_STAGES = [
  { n: 1, title: "Construct", desc: "Build core skills, habits, and confidence" },
  { n: 2, title: "Integrate", desc: "Explore disciplines, connect ideas, and test directions." },
  { n: 3, title: "Breakthrough", desc: "Develop a distinct voice and creative identity." },
  { n: 4, title: "Capstone", desc: "Design and document a signature project." },
  { n: 5, title: "Impact", desc: "Take your work into the real world and into elite applications." },
];

const TIERS = [
  {
    tier: "Tier 1 —",
    name: "Art Labs",
    desc: "Early exploration that builds curiosity, confidence, and creative habits.",
    grades: "Grades 5-10",
  },
  {
    tier: "Tier 2 —",
    name: "Foundation Studio",
    desc: "The creative engine is built through stronger skills, deeper thinking, and a personalized development plan.",
    grades: "Grades 8-10",
  },
  {
    tier: "Tier 3 —",
    name: "Portfolio Track",
    desc: "Personalized portfolio preparation for top global art & design programs.",
    grades: "Grade 9-12",
  },
];

const ALUMNI = [
  {
    img: "alumni-roy.png",
    name: "Roy L.",
    school: "Student at USC",
    quote:
      "“YGS challenged me to grow in ways I never expected… With their guidance, I built agency, explored unconventional ideas, and built a unique portfolio that reflected my voice”",
  },
  {
    img: "alumni-austin.png",
    name: "Austin L.",
    school: "Student at Carnegie Mellon",
    quote:
      "“YG gave me something no other studio could. It gave me true passion. From university-level technical courses to in-depth conceptual conversations, I developed a natural drive to create. I became more explorative, ambitious, and most importantly, authentic.”",
  },
  {
    img: "alumni-jenny.png",
    name: "Jenny Y.",
    school: "Student at Cornell",
    quote:
      "“YG help cultivates a kind of optimism for creative problem-solving. It's a way of thinking: continuous self-questioning, iterative problem-solving, systems-level perspective. No matter what job you're in, it makes you an Irreplaceable problem solver.”",
  },
];

const WHY_YG = [
  "Selective intake, high-touch mentorship",
  "Personalized Development Plan (PDP)",
  "YG Network: specialist mentors",
  "Identity + agency coaching",
  "Real-world projects",
  "Integrated AI literacy",
];

const PARENT_QUOTES = [
  {
    body: (
      <>
        Before we discovered YG Studio, my son was adrift, spending countless hours on video
        games, and showing little interest in academics or responsibility for his future. The
        young boy I worried about just a year ago has{" "}
        <strong className="text-ygs-red">evolved into a different teenager</strong> altogether,
        someone disciplined, committed, authentic, and passionate.
      </>
    ),
    name: "Rose H.",
  },
  {
    body: (
      <>
        I witnessed Lauren transforming from a not so confident and committed person to someone
        who was <strong className="text-ygs-red">driven and focused</strong>… not because she
        will be accepted by prestigious institutions, but because she is now equipped with tools
        that will stay with her to face the future for the rest of her life.
      </>
    ),
    name: "Elaine Y.",
  },
  {
    body: (
      <>
        Pete has sharp insight, enthusiasm, and patience. This is crucial for discovering a
        child&rsquo;s individuality and potential,{" "}
        <strong className="text-ygs-red">laying the foundation for their passion</strong>,
        portfolio development, and even future career pursuits… We are very grateful that Amy
        found YG and had the chance to grow in such an inspiring environment.
      </>
    ),
    name: "Sophia A.",
  },
];

const EDUCATORS = [
  { img: "educator-james.jpg", name: "James K", role: "Core Instructor" },
  { img: "educator-anhi.png", name: "Anhi T", role: "Academic & Portfolio Advisor" },
  { img: "educator-howard.jpg", name: "Howard C", role: "Core Instructor" },
  { img: "educator-christian.jpg", name: "Christian G", role: "Writing Instructor" },
  { img: "educator-jc.jpg", name: "JC F", role: "Creative Technology Instructor" },
  { img: "educator-cole.jpg", name: "Cole S", role: "3D Arts Instructor" },
];

const FACULTY_QUOTE = {
  img: "quote-logo-crofton.png",
  body: "“What sets Young Guns apart is how they empower students through real world projects and a community that brings out their best creative selves.”",
  name: "Kelly Poole, Crofton House Senior School Art Faculty",
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ——— Hero: video background + headline ——— */}
        <section className="relative flex min-h-[92svh] items-end justify-center overflow-hidden pb-20">
          <HeroVideo />
          <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            {/* Measured: Inter Variable 40px, tracking -0.04em, leading 1.0;
                white part wght 700, red part wght 600; letter-stagger entrance */}
            <h1 className="font-heading text-[28px] leading-none tracking-[-0.04em] text-white sm:text-[34px] lg:text-[40px]">
              <SplitText
                text="Unlock Your Child’s Creative Intelligence — "
                className="font-bold"
              />
              <SplitText
                text="Build a Future AI Can’t Replace"
                className="font-semibold text-ygs-red"
                baseDelay={780}
              />
            </h1>
            <Link
              href="/lets-chat"
              className="mt-8 inline-block rounded-full bg-ygs-red px-7 py-3 font-heading text-sm font-semibold tracking-[-0.01em] text-white transition-transform hover:scale-105"
            >
              Book a 1:1 Consultation
            </Link>
          </div>
        </section>

        {/* ——— Intro + stats (navy) ——— */}
        <section className="bg-ygs-navy px-6 py-24 text-center text-white">
          <Reveal>
            {/* Measured: 40px wght 700 tracking -0.04em leading 1.0;
                subhead 30px wght 600 in brand blue */}
            <h2 className="mx-auto max-w-3xl font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.04em] sm:text-[34px] lg:text-[40px]">
              Young Guns is Vancouver&rsquo;s Premier Art &amp; Design Institute for Ambitious
              Students.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-heading text-[22px] font-semibold tracking-[-0.02em] text-ygs-blue sm:text-[26px] lg:text-[30px]">
              We don&rsquo;t just build portfolios — we build identity, agency, and rigour.
            </p>
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-3">
            {[
              { stat: "900+", label: "Offers to Top Universities" },
              { stat: "$10M+", label: "Scholarships Earned by YG Students" },
              { stat: "17+ Years", label: "Boutique studio focused on elite creative education" },
            ].map((s, i) => (
              <Reveal key={s.stat} delay={i * 120}>
                {/* Measured: 64px wght 700 tracking -0.04em; labels 22px wght 600 gray */}
                <p className="font-heading text-[48px] font-bold leading-none tracking-[-0.04em] lg:text-[64px]">
                  {s.stat}
                </p>
                <p className="mx-auto mt-3 max-w-[240px] font-heading text-[18px] font-semibold tracking-[-0.02em] text-[rgb(186,186,186)] lg:text-[22px]">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ——— School logos + faculty quote ——— */}
        <section className="px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-heading text-xl font-bold text-ygs-navy">
              Top schools our alumni have been admitted to
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {SCHOOL_LOGOS.map((logo) => (
              <Image
                key={logo}
                src={`/images/${logo}`}
                alt=""
                width={120}
                height={60}
                className="h-10 w-auto object-contain sm:h-12"
              />
            ))}
          </div>
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <figure className="rounded-3xl bg-ygs-red px-8 py-10 text-white sm:px-12">
              <Image
                src={`/images/${FACULTY_QUOTE.img}`}
                alt=""
                width={120}
                height={104}
                className="mx-auto mb-6 h-14 w-auto object-contain brightness-0 invert"
              />
              <blockquote className="text-lg leading-relaxed">{FACULTY_QUOTE.body}</blockquote>
              <figcaption className="mt-6 text-sm font-bold text-white/90">
                {FACULTY_QUOTE.name}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ——— What we actually do ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">
                More than just art classes.
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                What we actually do.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ygs-navy/80">
                <p>Most art studios focus on technique and teach students to follow a formula.</p>
                <p>
                  We teach creative intelligence—the rare human abilities AI cannot imitate.
                </p>
                <p>
                  We cultivate curiosity, rigor, and agency. Students learn to think outside of
                  the box, shape their ideas with intention, and create work that they are stoked
                  to share with the world.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Image
                src="/images/what-we-do.png"
                alt="Students working together in the Young Guns studio"
                width={1117}
                height={607}
                className="w-full rounded-2xl object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* ——— Results ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <Image
                src="/images/results-work.png"
                alt="Student project work: industrial design models and sketches"
                width={1198}
                height={1064}
                className="w-full object-contain"
              />
            </Reveal>
            <Reveal delay={150} className="order-1 lg:order-2">
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">Results?</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                YG Students don&rsquo;t just perform,{" "}
                <span className="text-ygs-red">they build.</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ygs-navy/80">
                <p>
                  They build portfolios and stories that admissions officers remember—not through
                  formula, but through impact.
                </p>
                <p>
                  In the process, they develop the one skill required to thrive in the age of AI…
                </p>
                <p className="font-heading text-xl font-bold text-ygs-navy">Original thinking</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ——— 5-Stage Framework (red) ——— */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ygs-red px-6 py-16 text-white sm:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <p className="text-sm font-bold uppercase tracking-wide text-white/80">
                  A clear path from first napkin sketch to a world-class portfolio
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                  Our 5-Stage Creative Intelligence Framework
                </h2>
              </Reveal>
              <div className="space-y-3">
                {FRAMEWORK_STAGES.map((s, i) => (
                  <Reveal key={s.n} delay={i * 100}>
                    <div className="flex items-start gap-4 rounded-2xl bg-ygs-navy/90 px-6 py-4">
                      <span className="font-heading text-lg font-bold text-ygs-pink">{s.n}.</span>
                      <div>
                        <p className="font-heading text-lg font-bold">{s.title}</p>
                        <p className="mt-0.5 text-sm text-white/75">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Product Ecosystem (navy) ——— */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ygs-navy px-6 py-16 text-white sm:px-12">
            <Reveal className="text-center">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">Our Product Ecosystem</h2>
              <p className="mt-3 text-lg text-ygs-pink">Three Tracks, One Path to Creative Mastery</p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TIERS.map((t, i) => (
                <Reveal key={t.name} delay={i * 120} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl bg-white p-8 text-ygs-navy">
                    <p className="font-heading text-sm font-bold text-ygs-red">{t.tier}</p>
                    <h3 className="mt-1 font-heading text-2xl font-bold">{t.name}</h3>
                    <p className="mt-4 grow text-[15px] leading-relaxed text-ygs-navy/75">
                      {t.desc}
                    </p>
                    <p className="mt-6 inline-block self-start rounded-full bg-ygs-pink/40 px-4 py-1.5 text-sm font-bold">
                      {t.grades}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Students & Alumni ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">
                Student and Alumni
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                Hear it from those we taught and mentored
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {ALUMNI.map((a, i) => (
                <Reveal key={a.name} delay={i * 120}>
                  <figure>
                    <Image
                      src={`/images/${a.img}`}
                      alt={`${a.name}, ${a.school}`}
                      width={800}
                      height={1080}
                      className="aspect-[3/4] w-full rounded-2xl object-cover"
                    />
                    <figcaption className="mt-4">
                      <p className="font-heading text-lg font-bold text-ygs-navy">{a.name}</p>
                      <p className="text-sm font-bold text-ygs-red">{a.school}</p>
                    </figcaption>
                    <blockquote className="mt-3 text-[15px] leading-relaxed text-ygs-navy/75">
                      {a.quote}
                    </blockquote>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Why families choose YG ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <Image
                src="/images/why-families.png"
                alt="Students collaborating around a table at Young Guns Studio"
                width={1438}
                height={1076}
                className="w-full rounded-2xl object-cover"
              />
            </Reveal>
            <Reveal delay={150}>
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">
                For those serious about the future
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                Why families choose YG
              </h2>
              <ul className="mt-8 space-y-4">
                {WHY_YG.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg text-ygs-navy/85">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ygs-red text-xs font-bold text-white"
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ——— AI-era positioning ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">
                AI era positioning
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                Your child needs more than skill; they need{" "}
                <span className="text-ygs-red">creative intelligence</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ygs-navy/80">
                <p>
                  AI can draw, design, and write drafts. But AI cannot generate meaning, build
                  identity, or connect human experiences.
                </p>
                <p className="font-bold text-ygs-navy">That&rsquo;s what we train.</p>
                <p>
                  Tools will change. Your child&rsquo;s creative intelligence won&rsquo;t. We
                  build the part AI can&rsquo;t replace.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Image
                src="/images/ai-positioning.png"
                alt="Student sketching product designs by hand"
                width={1706}
                height={1136}
                className="w-full rounded-2xl object-cover"
              />
            </Reveal>
          </div>
        </section>

        {/* ——— Loved by families ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <h2 className="font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                Loved by families
              </h2>
              <p className="mt-3 text-lg text-ygs-navy/70">See why parents trust Young Guns</p>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PARENT_QUOTES.map((q, i) => (
                <Reveal key={q.name} delay={i * 120} className="h-full">
                  <figure className="flex h-full flex-col rounded-3xl border border-ygs-navy/10 bg-white p-8 shadow-sm">
                    <blockquote className="grow text-[15px] leading-relaxed text-ygs-navy/80">
                      {q.body}
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="font-heading font-bold text-ygs-navy">{q.name}</p>
                      <p className="text-sm text-ygs-navy/60">Parent</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Founder ——— */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-neutral-950 px-6 py-16 text-white sm:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
              <Reveal>
                <Image
                  src="/images/founder-pete.jpg"
                  alt="Pete, founder of Young Guns Studio"
                  width={1024}
                  height={1365}
                  className="w-full rounded-3xl object-cover"
                />
              </Reveal>
              <Reveal delay={150}>
                <p className="text-sm font-bold uppercase tracking-wide text-ygs-pink">
                  Hey parents and students!
                </p>
                <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
                  I&rsquo;m Pete, founder of Young Guns.
                </h2>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/80">
                  <p>
                    After two decades of teaching, here&rsquo;s what I know: school rewards
                    compliance and right answers. It&rsquo;s a race to the middle that leaves the
                    truly brilliant kids behind.
                  </p>
                  <p>
                    Roy was seen as distracted, unfocused, always restarting. His fast, nonlinear
                    mind made traditional school hard, if not impossible. Teachers&rsquo; favorite
                    report card comment? He wasn&rsquo;t reaching his potential.
                  </p>
                  <p className="font-bold text-white">
                    But he wasn&rsquo;t behind—he was ahead. He just needed someone to see him.
                  </p>
                  <p>
                    Together we worked on his mindset and voice, unearthing his brilliance
                    underneath the chaos. He built a powerful portfolio of projects that mattered
                    to him—sensory instruments, a chair for forest bathing, a manifesto about
                    perception, to give some examples. The result? Roy was accepted to USC&rsquo;s
                    Iovine &amp; Young Academy, one of the most selective innovation programs in
                    the world.
                  </p>
                  <p>
                    Now he&rsquo;s found his tribe. He&rsquo;s building apps with AI, joining
                    hackathons in Shanghai, working with developers and entrepreneurs at IYA.
                  </p>
                  <p>
                    I built YG for kids like Roy—students who can think creatively, take risks,
                    and build original ideas the world hasn&rsquo;t seen before.
                  </p>
                  <p className="font-bold text-white">
                    Don&rsquo;t let your child&rsquo;s spark get buried in compliance. Let&rsquo;s
                    build the story only they can tell.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ——— Educators ——— */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-wide text-ygs-red">
                Our Educators
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-ygs-navy sm:text-4xl">
                Teachers &amp; Mentors
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3">
              {EDUCATORS.map((e, i) => (
                <Reveal key={e.name} delay={(i % 3) * 100}>
                  <figure>
                    <Image
                      src={`/images/${e.img}`}
                      alt={`${e.name}, ${e.role}`}
                      width={800}
                      height={1000}
                      className="aspect-[4/5] w-full rounded-2xl object-cover"
                    />
                    <figcaption className="mt-3">
                      <p className="font-heading font-bold text-ygs-navy">{e.name}</p>
                      <p className="text-sm text-ygs-navy/60">{e.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Closing CTA (red gradient) ——— */}
        <section className="relative overflow-hidden bg-gradient-to-br from-neutral-950 via-ygs-red to-ygs-red px-6 py-28 text-center text-white">
          <Reveal className="relative z-10 mx-auto max-w-3xl">
            <h2 className="font-title text-3xl font-bold italic leading-tight sm:text-4xl">
              A BOUTIQUE ART &amp; DESIGN STUDIO THAT BUILDS AGENCY, IDENTITY, AND WORLD-CLASS
              PORTFOLIOS.
            </h2>
            <p className="mt-6 text-lg text-white/90">
              Join Young Guns Studio and empower your child to rise above the noise.
            </p>
            <Link
              href="/lets-chat"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-heading text-sm font-bold text-ygs-red transition-transform hover:scale-105"
            >
              Book a 1:1 Consultation
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  );
}
