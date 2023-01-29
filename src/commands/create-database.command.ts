import { Command, CommandRunner } from 'nest-commander';
import { promises as fs } from 'fs';
import { dirname } from 'path';

@Command({ name: 'create-database', description: "Create database if it isn't exists" })
export class CreateDatabaseCommand extends CommandRunner {
  async run(): Promise<void> {
    const databasePath = '.data/shop.sqlite';

    try {
      await fs.stat(databasePath);
      console.log(`Database already exists!`);
    } catch (error) {
      const dirName = dirname(databasePath);
      await fs.mkdir(dirName, { recursive: true });
      if (error.code === 'ENOENT') {
        await fs.writeFile(databasePath, '');
        console.log(`Database successfully created!`);
      } else {
        throw error;
      }
    }
  }
}
