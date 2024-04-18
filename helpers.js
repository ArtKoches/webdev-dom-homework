import { addCommentBtn, authorsTextInput, authorsNameInput } from "./main.js";

export function getFormatDate(date) {
  date = new Date(date)
    .toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .split(",")
    .join("");

  return date;
}

export function safeInput(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>");
}

export function addBtnValidate() {
  authorsNameInput.value.trim() && authorsTextInput.value.trim()
    ? (addCommentBtn.disabled = false)
    : (addCommentBtn.disabled = true);

  authorsNameInput.addEventListener("input", addBtnValidate);
  authorsTextInput.addEventListener("input", addBtnValidate);
}

export function resetInputType() {
  (authorsNameInput.value = ""),
    (authorsTextInput.value = ""),
    (addCommentBtn.disabled = true);
}
