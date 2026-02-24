import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { Event, IEvent } from "@/database";
import { cacheLife } from "next/cache";
import connectDB from "@/lib/mongodb";

const Page = async () => {
  "use cache";
  cacheLife("hours");

  await connectDB();

  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3 id="events">Featured Events</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard
                  title={event.title}
                  image={event.image}
                  slug={event.slug}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
