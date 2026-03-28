import Link from "next/link";
import { Bus, GraduationCap, Calendar } from "lucide-react";

const features = [
  {
    icon: Bus,
    title: "DIU Bus Schedule",
    desc: "Find DIU bus times by pickup point and view upcoming departures quickly.",
    to: "/diu-bus-schedule",
    color: "bg-black/10 text-black",
  },
  {
    icon: Calendar,
    title: "Academic Calendar",
    desc: "Coming soon — semester dates, exams, and university events.",
    to: "#",
    color: "bg-gray-100 text-gray-600",
  },
  {
    icon: GraduationCap,
    title: "Student Hub",
    desc: "Coming soon — notices, clubs, resources, and student tools.",
    to: "#",
    color: "bg-blue-100 text-blue-600",
  },
];

export const metadata = {
  title: "DIU Connect | Daffodil International University Student Platform",
  description:
    "DIU Connect helps Daffodil International University students find bus schedules, campus tools, academic updates, and useful student resources.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            DIU <span className="text-black">Connect</span>
          </h1>

          <p className="mt-3 text-gray-600">
            DIU Connect is a student platform for Daffodil International
            University. Start with the DIU bus schedule, then access academic
            updates, student resources, and campus tools in one place.
          </p>
        </header>

        <section
          aria-label="DIU Connect features"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = feature.to !== "#";

            if (isActive) {
              return (
                <Link
                  key={feature.title}
                  href={feature.to}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    className={`mb-3 inline-flex rounded-xl p-2.5 ${feature.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h2 className="font-semibold">{feature.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
                </Link>
              );
            }

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm opacity-60"
              >
                <div
                  className={`mb-3 inline-flex rounded-xl p-2.5 ${feature.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="font-semibold">{feature.title}</h2>
                <p className="mt-1 text-sm text-gray-500">{feature.desc}</p>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}