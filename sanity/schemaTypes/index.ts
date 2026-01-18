import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from '@/modules/about/schemas/about-schema'
import { faqPage } from '@/modules/faq/schemas/faq-schemas'
import { servicePage } from '@/modules/our-services/schemas/services-schema'
import { contactPage } from '@/modules/contact/schemas/contact-schema'
import { projectPage } from '@/modules/projects/schemas/project-schemas'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutPage, faqPage, servicePage, contactPage, projectPage],
}
