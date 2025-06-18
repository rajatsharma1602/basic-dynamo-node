import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../dynamo-client.js";
import { DB, Users } from "../constants.js";

const userId = Users[0];

async function deleteTodo(todoId, userId) {
    const command = new DeleteCommand({
        TableName: DB.tableName,
        Key: {
            pk: userId,
            sk: todoId
        }
    });
    const res = await ddbDocClient.send(command);
    console.log("res", res);
}

deleteTodo('TODO-a15d7d3b-233a-4d93-b1f7-435a6413f1d2', userId);

// [
//     {
//       sk: 'TODO-355587b0-2e2c-45eb-8398-d59e588e6398',
//       title: 'first todo',
//       pk: '9d098fcc-c760-48d5-8dec-536ef5c42d79'
//     },
//     {
//       sk: 'TODO-57508b96-c5a2-414e-8fb0-6c785a98cb16',
//       pk: '9d098fcc-c760-48d5-8dec-536ef5c42d79',
//       title: 'second todo',
//       dueDate: '2025-05-23'
//     },
//     {
//       sk: 'TODO-a15d7d3b-233a-4d93-b1f7-435a6413f1d2',
//       title: 'first todo',
//       pk: '9d098fcc-c760-48d5-8dec-536ef5c42d79'
//     },
//     {
//       sk: 'TODO-c3faf55f-ea97-40c5-87ae-a12e54f7b0d9',
//       pk: '9d098fcc-c760-48d5-8dec-536ef5c42d79',
//       title: 'third todo',
//       status: 'TODO',
//       dueDate: '2025-06-23'
//     }
//   ],