import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../dynamo-client.js";
import { DB, Users } from "../constants.js";


const userId = Users[0];
async function updateTodo(todoId, userId, updateObj) {
    const itemKeys = Object.keys(updateObj)
    const updateExp = `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`;
    console.log("udpateExp", updateExp);

    const expAttNames = itemKeys.reduce((accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }), {});
    console.log("expAttNames", expAttNames);

    const attvalues = itemKeys.reduce((accumulator, k, index) => (
        {
            ...accumulator,
            [`:value${index}`]: updateObj[k]
        }

    ), {});
    console.log("attvalues", attvalues)
    const command = new UpdateCommand({
        TableName: DB.tableName,
        Key: {
            pk: userId,
            sk: todoId,
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: updateExp,
        ExpressionAttributeNames: expAttNames,
        ExpressionAttributeValues: attvalues
    });
    const res = await ddbDocClient.send(command);
    console.log("res", res)
}

updateTodo('TODO-355587b0-2e2c-45eb-8398-d59e588e6398', userId, { dueDate: '2025-09-03', priority: 'LOW' })