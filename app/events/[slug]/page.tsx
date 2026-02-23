import EventDetails from "@/components/EventDetails";

const EventDetailsPage = ({ params }: { params: { slug: string } }) => {
  return (
    <main>
      <EventDetails params={params} />
    </main>
  );
};

export default EventDetailsPage;
