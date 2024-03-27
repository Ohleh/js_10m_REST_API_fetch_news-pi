const buttonRef = document.querySelector(".btn");
const ulrRef = document.querySelector(".user-list");

buttonRef.addEventListener("click", onButtonClick);

function onButtonClick() {
  return fetchUsers()
    .then((users) => renderUsers(users))
    .catch((e) => console.log("error:", e));
}

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUsers(users) {
  const markup = users.reduce(
    (acc, user) =>
      acc +
      `<li>
   <p><b>Name: </b>${user.name}</p>
   <p><b>Name: </b>${user.email}</p>
   <p><b>company: </b>${user.company.name}</p>
   </li>`,
    ""
  );
  ulrRef.insertAdjacentHTML("beforeend", markup);
}
