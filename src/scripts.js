import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createRequire } from "module";

const importCJSFile = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const require = createRequire(import.meta.url);

  const filePath = join(__dirname, filename);
  return require(filePath);
};

export { importCJSFile };
