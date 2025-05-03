export function getAuthToke() {
  const token = localStorage.getItem("token");

  return token;
}
