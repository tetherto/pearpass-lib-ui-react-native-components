import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src/icons/components');
const outputFile = path.join(process.cwd(), 'src/icons/Gallery.mdx');

// Find all the generated web components
const files = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') && !file.endsWith('.native.tsx') && file !== 'index.ts');

const iconNames = files.map(file => file.replace('.tsx', ''));

const mdxContent = `
import { Meta, Title } from '@storybook/addon-docs/blocks';
import * as Icons from './components';
import { IconExplorer } from './IconExplorer';

<Meta title="Icons" name="Gallery" />

<Title>Icon Gallery</Title>

<IconExplorer icons={Icons} />
`;

fs.writeFileSync(outputFile, mdxContent.trim());
console.log('✅ Generated Gallery.mdx storybook file');
