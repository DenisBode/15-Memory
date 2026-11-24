function getExitDialog() {
    return document.getElementById('exit-dialog');
}
function openExitDialog() {
    getExitDialog()?.showModal();
}
function closeExitDialog() {
    getExitDialog()?.close();
}
export function setupExitDialog(onExit) {
    document.querySelector('.game-header__exit')?.addEventListener('click', openExitDialog);
    document.getElementById('exit-dialog-back')?.addEventListener('click', closeExitDialog);
    document.getElementById('exit-dialog-exit')?.addEventListener('click', onExit);
}
