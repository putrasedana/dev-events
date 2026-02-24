import EventCard from "@/components/EventCard";
import { Event, IEvent } from "@/database";
import connectDB from "@/lib/mongodb";
import { cacheLife } from "next/cache";

const EventsPage = async () => {
  "use cache";
  cacheLife("hours");

  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return (
    <section>
      <h1 className="text-center">All Developer Events</h1>

      <p className="text-center mt-5">Discover upcoming hackathons, conferences, and meetups.</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: IEvent) => (
          <EventCard
            key={event.slug}
            title={event.title}
            image={event.image}
            slug={event.slug}
            location={event.location}
            date={event.date}
            time={event.time}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsPage;
