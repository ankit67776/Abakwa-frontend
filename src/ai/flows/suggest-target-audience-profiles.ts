'use server';

/**
 * @fileOverview An AI agent that suggests target audience profiles based on the ad description.
 *
 * - suggestTargetAudienceProfiles - A function that suggests target audience profiles.
 * - SuggestTargetAudienceProfilesInput - The input type for the suggestTargetAudienceProfiles function.
 * - SuggestTargetAudienceProfilesOutput - The return type for the suggestTargetAudienceProfiles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTargetAudienceProfilesInputSchema = z.object({
  adDescription: z.string().describe('The description of the ad.'),
});
export type SuggestTargetAudienceProfilesInput = z.infer<typeof SuggestTargetAudienceProfilesInputSchema>;

const SuggestTargetAudienceProfilesOutputSchema = z.object({
  suggestedProfiles: z.array(
    z.object({
      demographics: z.string().describe('The demographics of the target audience.'),
      interests: z.string().describe('The interests of the target audience.'),
      locations: z.string().describe('The locations of the target audience.'),
    })
  ).describe('An array of suggested target audience profiles.'),
});
export type SuggestTargetAudienceProfilesOutput = z.infer<typeof SuggestTargetAudienceProfilesOutputSchema>;

export async function suggestTargetAudienceProfiles(
  input: SuggestTargetAudienceProfilesInput
): Promise<SuggestTargetAudienceProfilesOutput> {
  return suggestTargetAudienceProfilesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTargetAudienceProfilesPrompt',
  input: {schema: SuggestTargetAudienceProfilesInputSchema},
  output: {schema: SuggestTargetAudienceProfilesOutputSchema},
  prompt: `You are an expert in advertising and marketing.

Given the following ad description, suggest three target audience profiles that would be most effective for this ad.

Ad Description: {{{adDescription}}}

Format your response as a JSON array of objects, where each object has the keys "demographics", "interests", and "locations".`, 
});

const suggestTargetAudienceProfilesFlow = ai.defineFlow(
  {
    name: 'suggestTargetAudienceProfilesFlow',
    inputSchema: SuggestTargetAudienceProfilesInputSchema,
    outputSchema: SuggestTargetAudienceProfilesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
