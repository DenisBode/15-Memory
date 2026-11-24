function getExitDialog(): HTMLDialogElement | null {
  return document.getElementById('exit-dialog') as HTMLDialogElement | null;
}

function openExitDialog(): void {
  getExitDialog()?.showModal();
}

function closeExitDialog(): void {
  getExitDialog()?.close();
}

export function setupExitDialog(onExit: () => void): void {
  document.querySelector('.game-header__exit')?.addEventListener('click', openExitDialog);
  document.getElementById('exit-dialog-back')?.addEventListener('click', closeExitDialog);
  document.getElementById('exit-dialog-exit')?.addEventListener('click', onExit);
}
