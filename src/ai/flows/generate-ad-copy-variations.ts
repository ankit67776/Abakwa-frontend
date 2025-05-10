'use server';

/**
 * @fileOverview A flow for generating ad copy variations based on a single description.
 *
 * - generateAdCopyVariations - A function that generates ad copy variations.
 * - GenerateAdCopyVariationsInput - The input type for the generateAdCopyVariations function.
 * - GenerateAdCopyVariationsOutput - The output type for the generateAdCopyVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdCopyVariationsInputSchema = z.object({
  description: z.string().describe('The description of the ad.'),
  numberOfVariations: z.number().default(3).describe('The number of ad copy variations to generate.'),
});
export type GenerateAdCopyVariationsInput = z.infer<typeof GenerateAdCopyVariationsInputSchema>;

const GenerateAdCopyVariationsOutputSchema = z.object({
  variations: z.array(
    z.string().describe('An ad copy variation.')
  ).describe('The generated ad copy variations.'),
});
export type GenerateAdCopyVariationsOutput = z.infer<typeof GenerateAdCopyVariationsOutputSchema>;

export async function generateAdCopyVariations(input: GenerateAdCopyVariationsInput): Promise<GenerateAdCopyVariationsOutput> {
  return generateAdCopyVariationsFlow(input);
}

const generateAdCopyVariationsPrompt = ai.definePrompt({
  name: 'generateAdCopyVariationsPrompt',
  input: {schema: GenerateAdCopyVariationsInputSchema},
  output: {schema: GenerateAdCopyVariationsOutputSchema},
  prompt: `You are an expert marketing copywriter. Generate {{numberOfVariations}} different ad copy variations based on the following description:\n\nDescription: {{{description}}}\n\nEach variation should be unique and compelling, designed to capture the attention of potential customers. Focus on highlighting the key benefits and features of the ad in a concise and engaging manner. Ensure that each ad copy variation is no more than 30 words.\n\nOutput the ad copy variations in JSON format.`, // Corrected Handlebars syntax here
});

const generateAdCopyVariationsFlow = ai.defineFlow(
  {
    name: 'generateAdCopyVariationsFlow',
    inputSchema: GenerateAdCopyVariationsInputSchema,
    outputSchema: GenerateAdCopyVariationsOutputSchema,
  },
  async input => {
    const {output} = await generateAdCopyVariationsPrompt(input);
    return output!;
  }
);
