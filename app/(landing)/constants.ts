import * as z from 'zod'

export const companyFormSchema = z.object({
    companyName: z.string().min(2, 'Your company name must be at least 2 characters'),
})