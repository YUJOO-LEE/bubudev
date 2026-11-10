import { expect, test } from '@playwright/test';

test('preserves the two developers and their contact addresses without repeated introductions', async ({ page }) => {
  await page.goto('/');
  for (const [name, email] of [['이유주', 'mail@leeyujoo.com'], ['박형준', 'kong8715@gmail.com']]) {
    await expect(page.getByText(name, { exact: true })).toHaveCount(1);
    await expect(page.locator(`a[href="mailto:${email}"]`)).toHaveCount(1);
    await expect(page.getByText(email, { exact: true })).toHaveCount(1);
  }
  for (const role of ['Frontend', 'Backend', '우리는 부부개발자!']) await expect(page.getByText(role, { exact: true })).toHaveCount(1);
  await expect(page.locator('body')).not.toContainText(/인터넷 집|같은 편|놀러|드래그|흔들기/);
});

test('the rounded display font loads locally and remains distinct from Korean body type', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ({
    loaded: Array.from(document.fonts).some(font => font.family === 'Fredoka' && font.status === 'loaded'),
    display: getComputedStyle(document.querySelector('h1')!).fontFamily,
    body: getComputedStyle(document.body).fontFamily,
  }));
  expect(fonts.loaded).toBe(true);
  expect(fonts.display).toContain('Fredoka');
  expect(fonts.body).toContain('Pretendard');
  expect(fonts.body).not.toContain('Gaegu');
});

for (const width of [320, 390, 600, 768, 1440, 1920]) {
  test(`the wordmark, contact text, and controls fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width > 1000 ? 1000 : 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => {
      const boxes = (selector: string) => Array.from(document.querySelectorAll(selector)).map(element => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, height: rect.height, width: rect.width, size: parseFloat(getComputedStyle(element).fontSize) };
      });
      const emailCenters = Array.from(document.querySelectorAll('.email-link')).map(element => {
        const icon = element.querySelector('svg')!.getBoundingClientRect();
        const text = element.querySelector('span')!.getBoundingClientRect();
        return Math.abs(icon.y+icon.height/2-text.y-text.height/2);
      });
      return { scrollWidth: document.documentElement.scrollWidth, height: document.querySelector('main')!.getBoundingClientRect().height, text: boxes('.person-heading h2,.person-heading > span,.email-link,.hero-description'), letters: boxes('.letter'), controls: boxes('.motion-button'), emails: boxes('.email-link'), emailCenters };
    });
    expect(geometry.scrollWidth).toBeLessThanOrEqual(width);
    for (const box of [...geometry.text, ...geometry.letters]) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(width);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.bottom).toBeLessThanOrEqual(geometry.height);
    }
    for (const box of geometry.text) expect(box.size).toBeGreaterThanOrEqual(16);
    for (const control of geometry.controls) {
      expect(control.width).toBeGreaterThanOrEqual(44);
      expect(control.height).toBeGreaterThanOrEqual(44);
    }
    for (const email of geometry.emails) expect(email.height).toBeGreaterThanOrEqual(44);
    for (const delta of geometry.emailCenters) expect(delta).toBeLessThan(0.5);
  });
}

test('motion pauses and resumes while contact focus stays usable', async ({ page }) => {
  await page.goto('/');
  await page.locator('.scene-ready').waitFor();
  const scene = page.locator('.couple-scene canvas');
  const moving = await scene.screenshot();
  await page.waitForTimeout(250);
  expect(moving.equals(await scene.screenshot())).toBe(false);
  await page.getByRole('button', { name: '애니메이션 일시정지' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.waitForTimeout(100);
  const paused = await scene.screenshot();
  await page.waitForTimeout(250);
  expect(paused.equals(await scene.screenshot())).toBe(true);
  await page.keyboard.press('Tab');
  await expect(page.locator('.person--yujoo')).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('data-person', 'yujoo');
  await expect(page.locator('.person--yujoo .portrait-envelope')).toHaveCSS('opacity', '1');
  await page.keyboard.press('Tab');
  await expect(page.locator('.person--hyungjun')).toBeFocused();
  await expect(page.locator('main')).toHaveAttribute('data-person', 'hyungjun');
  await page.evaluate(() => {
    document.querySelector('.person--hyungjun')!.addEventListener('click', event => {
      event.preventDefault();
      document.documentElement.dataset.contact = (event.currentTarget as HTMLAnchorElement).href;
    }, { once: true });
  });
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-contact', 'mailto:kong8715@gmail.com');
  await page.getByRole('button', { name: '애니메이션 재생' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('contact hover coordinates the portrait and wordmark response', async ({ page }) => {
  await page.goto('/');
  await page.locator('.scene-ready').waitFor();
  await page.waitForTimeout(1200);
  const letter = page.locator('.letter-0');
  const initial = await letter.evaluate(element => getComputedStyle(element).transform);
  await page.locator('.person--yujoo').hover();
  await expect(page.locator('main')).toHaveAttribute('data-person', 'yujoo');
  await expect.poll(() => letter.evaluate(element => getComputedStyle(element).transform)).not.toBe(initial);
  await expect(page.locator('.person--yujoo .portrait-envelope')).toHaveCSS('opacity', '1');
  await page.mouse.move(700, 80);
  await expect(page.locator('main')).toHaveAttribute('data-person', 'none');
});

test('the portrait scroll cue sits above the fold and links to both people', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const cue = page.getByRole('link', { name: '두 사람 소개 보기' });
  await expect(cue).toBeInViewport();
  const initial = (await cue.boundingBox())!;
  const bottomSpace = 844 - initial.y - initial.height;
  expect(bottomSpace).toBeGreaterThanOrEqual(40);
  expect(bottomSpace).toBeLessThanOrEqual(90);
  await page.evaluate(() => scrollTo(0, 200));
  await expect.poll(async () => (await cue.boundingBox())!.y).toBeLessThan(initial.y - 190);
  await cue.click();
  await expect(page).toHaveURL(/#people$/);
  await expect(page.locator('.person--yujoo .portrait')).toBeInViewport();
  await expect(page.locator('.person--hyungjun .email-link')).toBeInViewport();
});

test('mobile touch scroll works over the portraits with reduced motion', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 640 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  const title = (await page.locator('.wordmark').boundingBox())!;
  expect(title.y + title.height / 2).toBeGreaterThan(640 * .35);
  expect(title.y + title.height / 2).toBeLessThan(640 * .65);
  expect((await page.locator('.person--yujoo .portrait').boundingBox())!.y).toBeGreaterThan(640 * .9);
  const touch = await context.newCDPSession(page);
  const swipe = async (x: number, y: number) => {
    await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let i=1;i<=5;i++) {
      await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y:y-i*40 }] });
      await page.waitForTimeout(20);
    }
    await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  await swipe(195, 550);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(20);
  await page.waitForTimeout(200);
  const portrait = (await page.locator('.person--yujoo .portrait').boundingBox())!;
  await swipe(portrait.x + portrait.width / 2, portrait.y + portrait.height / 2);
  await expect(page.locator('a[href="mailto:kong8715@gmail.com"]')).toBeInViewport();
  await context.close();
});

test('the introduction and contacts remain usable without WebGL', async ({ page }) => {
  await page.addInitScript(`
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === 'webgl2' ? null : original.call(this, type, ...args);
    };
  `);
  await page.goto('/');
  await expect(page.locator('.scene-fallback')).toBeVisible();
  await expect(page.getByRole('heading', { name: '이유주', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '박형준', exact: true })).toBeVisible();
  await expect(page.locator('a[href="mailto:mail@leeyujoo.com"]')).toBeVisible();
});
