import { Link, useParams } from 'react-router-dom';

export default function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Event Detail page</h1>
      <p>{params.eventid}</p>

      <Link to={'..'} relative="path">
        Back
      </Link>
    </>
  );
}
