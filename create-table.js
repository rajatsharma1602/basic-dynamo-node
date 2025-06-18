import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { client } from "./dynamo-client.js";
import { DB } from "./constants.js";

const createTodoTable = async () => {


    const tableCommand = new CreateTableCommand({
        TableName: DB.tableName,
        BillingMode: "PAY_PER_REQUEST",
        AttributeDefinitions: [
            {
                AttributeName: "pk", //userid
                AttributeType: "S"
            },
            {
                AttributeName: "sk", //todoId
                AttributeType: "S"
            },
            // {
            //     AttributeName: "title",
            //     AttributeType: "S"
            // },
            // {
            //     AttributeName: "description",
            //     AttributeType: "S"
            // },
            {
                AttributeName: "status", // can be used as boolean or string type status like in progess todo or done
                AttributeType: "S"
            },
            {
                AttributeName: "dueDate",
                AttributeType: "S"
            },
            {
                AttributeName: "priority",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: 'pk', KeyType: "HASH",
            },
            { AttributeName: 'sk', KeyType: "RANGE" }
        ],
        LocalSecondaryIndexes: [
            {
                IndexName: "byStatus",
                KeySchema: [
                    {
                        AttributeName: "pk", KeyType: "HASH"
                    },
                    {
                        AttributeName: 'status',
                        KeyType: "RANGE"
                    }
                ],
                Projection: { ProjectionType: "ALL" },
            },
            {
                IndexName: "byDueDate",
                KeySchema: [
                    {
                        AttributeName: "pk", KeyType: "HASH"
                    },
                    {
                        AttributeName: 'dueDate',
                        KeyType: "RANGE"
                    }
                ],
                Projection: { ProjectionType: "ALL" }
            },
            {
                IndexName: "byPriority",
                KeySchema: [
                    {
                        AttributeName: "pk", KeyType: "HASH"
                    },
                    {
                        AttributeName: 'priority',
                        KeyType: "RANGE"
                    }
                ],
                Projection: { ProjectionType: "ALL" }
            }
        ]
    });
    try {
        const data = await client.send(tableCommand);
        const tableName = data.TableDescription?.TableName ?? "";
        console.log("Table Created Successfully:", tableName);
    }
    catch (error) {
        console.error("Error Creating Table:", error);
    }
}

createTodoTable()