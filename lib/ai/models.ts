export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const models: ChatModel[] = [
  {
    id: 'chat-model',
    name: 'GPT-4o Mini',
    description: 'Fast OpenAI model (No credit card required)',
  },
  {
    id: 'chat-model-reasoning',
    name: 'OpenAI o1-mini',
    description: 'Reasoning model for complex logic',
  },
  {
    id: 'title-model',
    name: 'GPT-4o Mini',
    description: 'Used for generating chat titles',
  },
  {
    id: 'artifact-model',
    name: 'GPT-4o',
    description: 'Used for creating detailed artifacts',
  },
];

export const DEFAULT_CHAT_MODEL: string = 'chat-model';
