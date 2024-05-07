import { commentText, commentAddBtn } from "./render-add-comment-form.js";
//imports

function getFormatDate(date) {
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

function safeInput(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>");
}

function resetInputType() {
  (commentText.value = ""), (commentAddBtn.disabled = true);
}

//exports
export { getFormatDate, safeInput, resetInputType };
