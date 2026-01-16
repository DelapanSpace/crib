import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "about Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    //STORY
    defineField({
      name: "storySection",
      title: "Story Section",
      type: "string",
      initialValue: "1",
    }),
    defineField({
      name: "storyTitle",
      title: "Story Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "process",
      title: "Process Section",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Process Title",
          type: "string",
          initialValue: "Our Process",
        },
        {
          name: "steps",
          title: "Process Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "id", title: "Step Number", type: "string" },
                { name: "title", title: "Step Title", type: "string" },
                {
                  name: "description",
                  title: "Step Description",
                  type: "text",
                },
              ],
            },
          ],
          validation: (Rule) => Rule.min(3),
        },
      ],
    }),
  ],
});
