import busSchedule from "../../../data/busSchedule.json";
import { notFound } from "next/navigation";

export default async function RoutePage({ params }) {
  const { routeName } = await params;

  const route = busSchedule.routes.find((item) => item.slug === routeName);

  if (!route) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">{route.routeNo}</p>
        <h1 className="mt-1 text-2xl font-bold">{route.routeName}</h1>

        <div className="mt-6">
          <h2 className="mb-2 font-semibold">Stops</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            {route.stops.map((stop, index) => (
              <li key={index}>• {stop}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 font-semibold">Weekdays</h2>
            <p className="text-sm text-gray-600">
              To DIU: {route.schedule.weekdays.toDIU.join(", ") || "No service"}
            </p>
            <p className="text-sm text-gray-600">
              From DIU: {route.schedule.weekdays.fromDIU.join(", ") || "No service"}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-semibold">Friday</h2>
            <p className="text-sm text-gray-600">
              To DIU: {route.schedule.friday.toDIU.join(", ") || "No service"}
            </p>
            <p className="text-sm text-gray-600">
              From DIU: {route.schedule.friday.fromDIU.join(", ") || "No service"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}