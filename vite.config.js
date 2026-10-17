import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function copyStaticDirsPlugin() {
  return {
    name: 'copy-static-dirs',
    closeBundle() {
      for (const dir of ['bg', 'logos']) {
        const srcDir = path.resolve(dir);
        const destDir = path.resolve('dist', dir);
        if (fs.existsSync(srcDir)) {
          fs.cpSync(srcDir, destDir, { recursive: true });
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [copyStaticDirsPlugin()]
});
