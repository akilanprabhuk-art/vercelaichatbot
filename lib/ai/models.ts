export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const models: ChatModel[] = [
  { id: 'chat-model', name: 'GPT-4o Mini', description: 'Fast OpenAI model' },
  { id: 'chat-model-reasoning', name: 'o1-mini', description: 'OpenAI Reasoning' },
];

export const DEFAULT_CHAT_MODEL: string = 'chat-model';
