import { test, expect } from '@playwright/experimental-ct-react17';
import App from './App';

test('App component renders', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('TypeScript Import Test App');
  await expect(component).toContainText('NamespaceModuleExcludes')
});
