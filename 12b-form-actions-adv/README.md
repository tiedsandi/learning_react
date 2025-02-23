# Form Actions Lanjutan

## contoh form action dengan async

## cara loading state dengan useActionState() atau useFormStatus()

## Registering Multiper FormActions

<!-- berikan penjelasan disini -->

```jsx
export default function Opinion() {
  function upVoteAction() {
    console.log('upVoteAction');
  }

  function downVoteAction() {
    console.log('downVoteAction');
  }

  return (
    <form className="votes">
      <button formAction={upVoteAction}>UpVote</button>
      <button formAction={downVoteAction}>DownVote</button>
    </form>
  );
}
```
