import { test, expect } from '@playwright/experimental-ct-react17';
import App from './App';

test('App component renders', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('TypeScript Import Test App');
});

test('App component has editor container', async ({ mount }) => {
  const component = await mount(<App />);
  const editorContainer = component.locator('#editor-worker');
  await expect(editorContainer).toBeVisible();
});