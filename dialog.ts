/**
 * Finds the exit dialog.
 * @returns The dialog, or null if it is missing.
 */
function getExitDialog(): HTMLDialogElement | null {
  return document.getElementById('exit-dialog') as HTMLDialogElement | null;
}

/**
 * Opens the exit dialog as a modal.
 */
function openExitDialog(): void {
  getExitDialog()?.showModal();
}

/**
 * Closes the exit dialog and returns to the game.
 */
function closeExitDialog(): void {
  getExitDialog()?.close();
}

/**
 * Connects the exit button and the dialog buttons.
 * @param onExit - Called when the player confirms leaving the game.
 */
export function setupExitDialog(onExit: () => void): void {
  document.querySelector('.game-header__exit')?.addEventListener('click', openExitDialog);
  document.getElementById('exit-dialog-back')?.addEventListener('click', closeExitDialog);
  document.getElementById('exit-dialog-exit')?.addEventListener('click', onExit);
}
