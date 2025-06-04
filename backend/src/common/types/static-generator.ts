import { ContentDTOSchema } from 'src/content/dto/content.dto';

export type IStaticGeneratorContent = {
  content: ContentDTOSchema['Read'];
  lastUpdated: string;
  meta: {
    totalItems: number;
    generatedAt: string;
  };
};
