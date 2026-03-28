import busSchedule from "../../data/busSchedule.json";
import BusScheduleClient from "./BusScheduleClient";

export const metadata = {
  title: "DIU Bus Schedule | DIU Transport to Daffodil Smart City",
  description:
    "Find DIU bus schedules from Mirpur, Uttara, Dhanmondi, and more. Check departure times and next buses to Daffodil Smart City.",
  alternates: { canonical: "/diu-bus-schedule" },
};

export default function BusSchedulePage() {
  return <BusScheduleClient schedule={busSchedule} />;
}