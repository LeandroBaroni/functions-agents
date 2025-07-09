import type { FastifyRequest } from "fastify";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

const schemaValidation = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
});

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post("/rooms", async (request: FastifyRequest, reply) => {
    const { name, description } = schemaValidation.parse(request.body);

    const results = await db
      .insert(schema.rooms)
      .values({
        name,
        description,
      })
      .returning();

    const room = results[0];

    if (!room) {
      throw new Error("Failed to create a new room");
    }

    return reply.status(201).send({ id: room.id });
  });
};
