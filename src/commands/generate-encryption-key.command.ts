import { CommandRunner, Command } from 'nest-commander';
import { randomBytes } from 'crypto';
import { EnvService } from 'env.service';

@Command({
  name: 'generate-encryption-key',
  description: 'Generates application encryption key and put it into ".env" file.',
})
export class GenerateEncryptionKeyCommand extends CommandRunner {
  private readonly envFilename = '.env';
  private readonly envVariableName = 'ENCRYPTION_KEY';

  constructor(private readonly envService: EnvService) {
    super();
  }

  public async run() {
    const key = this.generateSecurityKey();
    this.envService.load(this.envFilename);
    this.envService.set(this.envVariableName, key);
    this.envService.save(this.envFilename);
    console.log('Encryption key successfully generated!');
  }

  private generateSecurityKey(): string {
    return randomBytes(32).toString('base64');
  }
}
