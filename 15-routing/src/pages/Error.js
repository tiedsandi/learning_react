import MainNavigation from '../components/MainNavigations';

export default function ErrorPage({ title }) {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An Error</h1>
        <p>{title}</p>
      </main>
    </>
  );
}
