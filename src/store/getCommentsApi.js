export function getCommentsFromServer() {
  return fetch("https://jsonplaceholder.typicode.com/comments").then((data) =>
    data.json()
  );
}
