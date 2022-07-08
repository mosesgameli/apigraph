import { exec } from "child_process";
import { promisify } from "util";

const execute = promisify(exec);
const log = console.log;

function init() {
  const jestConfig = "ts-jest config:init";
  const tsConfig =
    "tsc --init" +
    " --project ./temp.tsconfig.json" +
    " --target es6" +
    " --module commonjs" +
    " --moduleResolution node" +
    " --rootDir ." +
    " --baseUrl ./src" +
    " --allowJs false" +
    " --declaration false" +
    " --outDir ./dist" +
    " --esModuleInterop true" +
    " --forceConsistentCasingInFileNames true" +
    " --strict true" +
    " --noImplicitAny true" +
    " --strictNullChecks true" +
    " --alwaysStrict true" +
    " --noImplicitOverride true" +
    " --skipLibCheck true";

  const commands = [tsConfig, jestConfig];

  commands.forEach(async (cmd) => {
    let proc = await execute(cmd);

    if (proc.stderr) {
      return log(proc.stderr);
    }

    log(proc.stdout);
  });
}

init();
