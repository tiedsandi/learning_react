import { useActionState } from 'react';

function opinionAction(prevState, formData) {
  const userName = formData.get('userName');
  const title = formData.get('title');
  const body = formData.get('body');

  let errors = [];
  if (title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }
  if (body.trim().length < 10 || body.trim().length > 300) {
    errors.push('Opinion must be between 10 and 300 characters long');
  }
  if (!userName.trim()) {
    errors.push('User Name is required');
  }

  if (errors.length > 0) {
    return { errors, enteredValues: { userName, title, body } };
  }

  return { error: null };
}

export function NewOpinion() {
  const [formState, formAction] = useActionState(opinionAction, { errors: null });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
