import { enableTabMode } from './enableTabMode';

enableTabMode();

describe('Utils | enableTabMode', () => {
  beforeAll(() => {
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
    });

    document.dispatchEvent(event);
  });

  it('should add bi-tab-mode className to body on TAB key pressed', () => {
    expect(document.body.classList.contains('bi-tab-mode')).toBeTruthy();
  });

  it('should remove bi-tab-mode className to body on TAB key pressed', () => {
    const event = new MouseEvent('mousemove', {
      screenX: 1,
      screenY: 1,
    });

    document.dispatchEvent(event);

    expect(document.body.classList.contains('bi-tab-mode')).toBeFalsy();
  });

  it('should not add bi-tab-mode className to body on any other key pressed', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });

    document.dispatchEvent(event);

    expect(document.body.classList.contains('bi-tab-mode')).toBeFalsy();
  });
});
