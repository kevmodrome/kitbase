import { expect, test } from '@playwright/test';

test('page loads', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('PodKit');
});
