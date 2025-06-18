import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
    region: "us-east-1",
    endpoint: "http://localhost:8000"

});

import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// ... DynamoDB client creation

export const ddbDocClient = DynamoDBDocumentClient.from(client);