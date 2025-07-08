import { eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

const schemGetById = z.object({
  id: z.string().trim(),
});

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
      })
      .from(schema.rooms)
      .orderBy(schema.rooms.createdAt);

    return results;
  });

  app.get("/rooms/:id", (request, response) => {
    const { id } = schemGetById.parse(request.params);

    return db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
      })
      .from(schema.rooms)
      .where(eq(schema.rooms.id, id))
      .then((result) => {
        if (result.length === 0) {
          response.status(404).send({ error: "Room not found" });
        } else {
          response.send(result[0]);
        }
      })
      .catch((error) => {
        response
          .status(500)
          .send({ error: "Internal Server Error", details: error.message });
      });
  });
};
