import { useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const id = params.eventid;

  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch detail for selected event.' }),
      {
        status: 500,
      }
    );
  } else {
  }

  return response;
}

export function HydrateFallback() {
  return <p>Loading datass...</p>;
}
