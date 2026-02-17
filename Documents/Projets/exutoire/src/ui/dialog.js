export async function confirmDialog(message) {
  if (typeof HTMLDialogElement === "undefined") {
    return window.confirm(message);
  }

  const dialog = document.createElement("dialog");
  dialog.className = "confirm-dialog";

  const form = document.createElement("form");
  form.method = "dialog";

  const text = document.createElement("p");
  text.textContent = message;

  const controls = document.createElement("div");
  controls.className = "dialog-actions";

  const cancel = document.createElement("button");
  cancel.type = "submit";
  cancel.value = "cancel";
  cancel.className = "btn btn--ghost";
  cancel.textContent = "Annuler";

  const confirm = document.createElement("button");
  confirm.type = "submit";
  confirm.value = "confirm";
  confirm.className = "btn btn--danger";
  confirm.textContent = "Supprimer";

  controls.append(cancel, confirm);
  form.append(text, controls);
  dialog.append(form);
  document.body.append(dialog);

  dialog.showModal();

  const result = await new Promise((resolve) => {
    dialog.addEventListener("close", () => {
      resolve(dialog.returnValue === "confirm");
    });
  });

  dialog.remove();
  return result;
}
