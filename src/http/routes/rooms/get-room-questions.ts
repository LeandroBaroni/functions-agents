import { desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

const schemaValidation = z.object({
  roomId: z.string().trim(),
});

export const getRoomsQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms/:roomId/questions", async (request, reply) => {
    const { roomId } = schemaValidation.parse(request.params);

    const results = await db
      .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      })
      .from(schema.questions)
      .where(eq(schema.questions.roomId, roomId))
      .orderBy(desc(schema.questions.createdAt));

    return reply.status(200).send(results);
  });
};
