import { APIGatewayEvent } from "aws-lambda";
import { apiResponse } from "../../utils/api";
import { getConnection } from "../../utils/database";

export const handler = async (event: APIGatewayEvent) => {
  const { address } = event.pathParameters as unknown as { address: string };

  if (!address) return apiResponse(403, { message: "Address is required" });
  if (!event.body) return apiResponse(403, { message: "Body is required" });

  const { nickname, description } = JSON.parse(event.body);
  const prisma = getConnection();

  const user = await prisma.user.upsert({
    where: {
      address,
    },
    update: {
      nickname,
      description,
    },
    create: {
      nickname,
      description,
      address,
    },
  });

  return apiResponse(201, { user });
};
