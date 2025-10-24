import { MastraClient } from '@mastra/client-js';

// @note mastra client configuration
const BASE_URL = import.meta.env.VITE_MASTRA_BASE_URL || 'http://localhost:4111';
const TOKEN = import.meta.env.VITE_MASTRA_TOKEN || '<YOUR_JWT_TOKEN>';

// @note singleton mastra client instance
let mastraClient: MastraClient | null = null;

/**
 * @note get or create mastra client instance
 * @returns MastraClient instance
 */
export const getMastraClient = (): MastraClient => {
  if (!mastraClient) {
    mastraClient = new MastraClient({
      baseUrl: BASE_URL,
      headers: TOKEN !== '<YOUR_JWT_TOKEN>' ? { Authorization: `Bearer ${TOKEN}` } : {},
    });
  }
  return mastraClient;
};

/**
 * @note execute makalah workflow with topic input
 * @param topic - the topic for makalah generation
 * @returns promise with workflow result
 */
export const generateMakalah = async (topic: string): Promise<string> => {
  const client = getMastraClient();
  const workflow = client.getWorkflow('makalahWorkflow');
  const response = await workflow.startAsync({ inputData: { topic } });
  
  if (response.status === 'success') {
    return response.result?.makalah || '';
  }
  
  throw new Error('Failed to generate makalah');
};
