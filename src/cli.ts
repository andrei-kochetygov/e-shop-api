import { CommandFactory } from 'nest-commander';
import { CommandLineInterfaceModule } from './cli.module';

async function bootstrap() {
  await CommandFactory.run(CommandLineInterfaceModule, ['warn', 'error']);
}
bootstrap();
