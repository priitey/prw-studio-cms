import * as migration_20251009_155439_initial from './20251009_155439_initial';
import * as migration_20251019_003922 from './20251019_003922';
import * as migration_20251022_042151 from './20251022_042151';

export const migrations = [
  {
    up: migration_20251009_155439_initial.up,
    down: migration_20251009_155439_initial.down,
    name: '20251009_155439_initial',
  },
  {
    up: migration_20251019_003922.up,
    down: migration_20251019_003922.down,
    name: '20251019_003922',
  },
  {
    up: migration_20251022_042151.up,
    down: migration_20251022_042151.down,
    name: '20251022_042151'
  },
];
