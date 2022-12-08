/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
function refresh() {
  const reset = document.querySelector(".fa-refresh");

  reset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}
export { refresh };
