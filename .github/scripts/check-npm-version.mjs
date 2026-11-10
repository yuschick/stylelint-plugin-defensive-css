// npm trusted publishing (OIDC) needs npm 11.5.1 or newer
import { execFileSync } from 'node:child_process';

const MINIMUM = [11, 5, 1];
const version = execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim();
const parts = version.split('.').map((part) => Number.parseInt(part, 10));
const firstDifference = MINIMUM.findIndex(
  (minimumPart, index) => parts[index] !== minimumPart,
);
const isSupported =
  firstDifference === -1 ||
  (parts[firstDifference] ?? 0) > (MINIMUM[firstDifference] ?? 0);

if (!isSupported) {
  process.stderr.write(
    `::error::npm ${version} is too old for trusted publishing. Use npm ${MINIMUM.join('.')} or newer.\n`,
  );
  process.exit(1);
}

process.stdout.write(`npm ${version} supports trusted publishing\n`);
