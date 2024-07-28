import { z } from 'zod';
import * as environment from '$env/static/private';

export const ServerConfigSchema = z.object({
	PROJECT_REF: z.string().trim().min(1),
	PUBLIC_SUPABASE_URL: z.string().trim().min(1),
	PUBLIC_SUPABASE_ANON_KEY: z.string().trim().min(1),
	KV_URL: z.string().trim().min(1),
	KV_REST_API_URL: z.string().trim().min(1),
	KV_REST_API_TOKEN: z.string().trim().min(1),
	KV_REST_API_READ_ONLY_TOKEN: z.string().trim().min(1)
});

export type ServerConfigSchema = z.infer<typeof ServerConfigSchema>;

export const config = ServerConfigSchema.parse(environment);
