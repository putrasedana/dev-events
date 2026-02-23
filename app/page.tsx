import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { cacheLife } from "next/cache";

const Page = async () => {
  "use cache";
  cacheLife("hours");

  await connectDB();

  const events = await Event.find().lean();

  const formattedEvents = events.map((event) => ({
    ...event,
    _id: event._id.toString(),
  }));

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>

      <ExploreBtn />

      <ul className="events">
        {formattedEvents.map((event) => (
          <li key={event._id}>
            <EventCard {...event} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Page;
