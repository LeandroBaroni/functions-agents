import { count, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { handleGetById } from "./rooms/get-by-id.ts";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.rooms.id, schema.questions.roomId))
      .groupBy(schema.rooms.id)
      .orderBy(schema.rooms.createdAt);

    return results;
  });

  // app.get("/rooms/:id", async (request, response) => {
  //   const { id } = schemGetById.parse(request.params);

  //   const results = await db
  //     .select({
  //       id: schema.rooms.id,
  //       name: schema.rooms.name,
  //     })
  //     .from(schema.rooms)
  //     .where(eq(schema.rooms.id, id));

  //   if (!results.length) {
  //     response.status(404).send(null);
  //   }
  //   response.status(200).send(results[0]);
  // });

  app.get("/rooms/:id", handleGetById);
};
