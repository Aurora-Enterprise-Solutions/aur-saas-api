import { PlopGeneratorConfig } from 'node-plop'

export interface PlopGenerator {
  name: string;
  generator: Partial<PlopGeneratorConfig>;
}
