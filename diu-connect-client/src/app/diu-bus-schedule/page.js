import Link from "next/link";
import busSchedule from "../../data/busSchedule.json";

export default function BusPage() {
  const routes = busSchedule.routes;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            DIU Bus Schedule
          </h1>
          <p className="text-gray-500 mt-2">
            Select your route to see full schedule
          </p>
        </div>

        {/* Routes */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.routeNo}
              href={`/diu-bus-schedule/${route.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-gray-500">{route.routeNo}</p>

              <h2 className="font-semibold text-lg mt-1">
                {route.routeName}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                {route.stops[0]} → {route.stops[route.stops.length - 1]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}