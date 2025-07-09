import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

const schemaParamsValidation = z.object({
  roomId: z.string().trim(),
});

const schemaBodyValidation = z.object({
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
});

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post("/rooms/:roomId/questions", async (request, reply) => {
    const { question, answer } = schemaBodyValidation.parse(request.body);
    const { roomId } = schemaParamsValidation.parse(request.params);

    const results = await db
      .insert(schema.questions)
      .values({
        question,
        answer,
        roomId,
      })
      .returning();

    const data = results[0];

    if (!data) {
      throw new Error("Failed to create question");
    }

    return reply.status(201).send({ id: data.id });
  });
};
