import { defineField, defineType } from "sanity";

export const projectPage = defineType({
  name: "project",
  title: "Project Page",
  type: "document",

  fields: [
    // =========================
    // CORE
    // =========================
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    // =========================
    // HERO SECTION
    // =========================
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    }),

    // =========================
    // CONTENT SECTIONS
    // =========================
    defineField({
      name: "section1",
      title: "Section 1 (Challenge)",
      type: "object",
      fields: [
        defineField({
          name: "header",
          title: "Header",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),

    defineField({
      name: "section2",
      title: "Section 2 (Solution)",
      type: "object",
      fields: [
        defineField({
          name: "header",
          title: "Header",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
        }),
      ],
    }),

    // =========================
    // GALLERY
    // =========================
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Image Title",
              type: "string",
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),

    // =========================
    // PROCESS
    // =========================
    defineField({
      name: "process",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),

    // =========================
    // IMPACT
    // =========================
    defineField({
      name: "impact",
      title: "Impact / Stats",
      description: "Add stats like '40%' (Value) and 'Increase in Traffic' (Label)",
      type: "array",
      of: [
        {
          type: "object",
          title: "Stat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: "e.g., 40%, 10k+, 2.5x",
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g., Increase in Traffic",
            }),
          ],
          // This preview helps you see the data nicely in Sanity Studio
          preview: {
            select: {
              title: "value",
              subtitle: "label",
            },
          },
        },
      ],
    }),

    // =========================
    // META / OPTIONAL
    // =========================
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
});