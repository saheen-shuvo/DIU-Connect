import schedule from "@/data/busSchedule.json";
import RouteCard from "@/components/bus/RouteCard";
import { notFound } from "next/navigation";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const formatTitle = (text = "") =>
  text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export async function generateMetadata({ params }) {
  const { routeName } = await params;
  const keyword = normalize(routeName);
  const formattedLocation = formatTitle(routeName);

  const matchedRoutes = schedule.routes.filter((route) =>
    route.stops.some((stop) => normalize(stop).includes(keyword)),
  );

  if (matchedRoutes.length === 0) {
    return {
      title: "Location Not Found | DIU Bus Schedule",
      description: "No bus routes found for this location.",
    };
  }

  return {
    title: `${formattedLocation} Bus Schedule | DIU Connect`,
    description: `Browse DIU bus routes, stops, and schedules for ${formattedLocation}. Find buses passing through ${formattedLocation} to and from Daffodil Smart City.`,
    keywords: [
      `${formattedLocation} bus`,
      `${formattedLocation} DIU bus`,
      `${formattedLocation} bus schedule`,
      "DIU bus schedule",
      "Daffodil Smart City bus",
      "DIU Connect",
    ],
    alternates: {
      canonical: `/diu-bus-schedule/${routeName}`,
    },
    openGraph: {
      title: `${formattedLocation} Bus Schedule | DIU Connect`,
      description: `Find DIU bus routes and schedules for ${formattedLocation}.`,
      url: `/diu-bus-schedule/${routeName}`,
      siteName: "DIU Connect",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedLocation} Bus Schedule | DIU Connect`,
      description: `Find DIU bus routes and schedules for ${formattedLocation}.`,
    },
  };
}

export default async function RouteNamePage({ params }) {
  const { routeName } = await params;
  const keyword = normalize(routeName);
  const formattedLocation = formatTitle(routeName);

  const matchedRoutes = schedule.routes.filter((route) =>
    route.stops.some((stop) => normalize(stop).includes(keyword)),
  );

  if (matchedRoutes.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          {formattedLocation} Bus Schedule
        </h1>
        <p className="text-sm text-muted-foreground">
          Find DIU buses passing through {formattedLocation} to and from
          Daffodil Smart City.
        </p>
      </header>

      <section className="space-y-4">
        {matchedRoutes.map((route) => (
          <RouteCard
            key={route.routeNo}
            route={route}
            highlightQuery={routeName}
            selectedDay="weekdays"
          />
        ))}
      </section>
    </main>
  );
}