export const enableTabMode = () => {
  const TAB_MODE_CLASSNAME = 'bi-tab-mode';

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      document.body.classList.add(TAB_MODE_CLASSNAME);
    }

    document.addEventListener('mousemove', onMouseMove);
  });

  function onMouseMove(event: MouseEvent): void {
    document.body.classList.remove(TAB_MODE_CLASSNAME);

    document.removeEventListener('mousemove', onMouseMove);
  }
};
