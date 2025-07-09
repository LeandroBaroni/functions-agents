import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";

const schemGetById = z.object({
  id: z.string().trim(),
});

export async function handleGetById(
  request: FastifyRequest,
  response: FastifyReply
) {
  const { id } = schemGetById.parse(request.params);
  const results = await db
    .select({
      id: schema.rooms.id,
      name: schema.rooms.name,
    })
    .from(schema.rooms)
    .where(eq(schema.rooms.id, id));

  if (!results.length) {
    response.status(404).send(null);
  }
  response.status(200).send(results[0]);
}
