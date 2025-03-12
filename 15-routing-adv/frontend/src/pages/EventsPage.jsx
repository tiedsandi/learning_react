import { Link } from 'react-router-dom';

const Events = [
  { id: 'p123', title: 'Event 1' },
  { id: 'p234', title: 'Event 2' },
  { id: 'p345', title: 'Event 3' },
];

export default function EventsPage() {
  return (
    <>
      <h2>Events Page</h2>
      <ul>
        {Events.map((prod) => (
          <li key={prod.id}>
            <Link to={prod.id}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
