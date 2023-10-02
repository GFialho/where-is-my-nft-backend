import { APIGatewayEvent } from "aws-lambda";
import { apiResponse } from "../../utils/api";
import { getConnection } from "../../utils/database";

export const handler = async (event: APIGatewayEvent) => {
  const { address } = event.pathParameters as unknown as { address: string };

  if (!address) return apiResponse(401, { message: "Address is required" });

  const prisma = getConnection();

  const user = await prisma.user.findUnique({ where: { address } });
  return apiResponse(200, { user });
};
