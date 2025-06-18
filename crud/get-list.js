// take in parameters for sort by default use byTitleAndDueDate

/**
 * options
 * - byTitleAndDueDate
 * - byTitleAndStatus
 * - byPriority
 */

import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../dynamo-client.js";
import { DB, Users } from "../constants.js";

const userId = Users[0];
const firstTodoId = 'TODO-52cc04a0-7e75-48cf-8f3b-53172486e87a'
const secondTodoId = 'TODO-2b8a5f90-59d0-41e7-afbe-757cf4ebfbfe'
function getAllTodoForUser(userId) {
    return new QueryCommand({
        TableName: DB.tableName,
        KeyConditionExpression: "pk = :uid",
        ExpressionAttributeValues: {
            ":uid": userId,
        },
    });
}

function getSpecificTodo(userId, todoId) {
    const commandObj = {
        TableName: DB.tableName,
        Key: {
            pk: userId,
            sk: todoId
        },
    }
    return new GetCommand(commandObj);
}

function getTodoByStatus(userId, status) {
    return new QueryCommand({
        TableName: DB.tableName,
        IndexName: "byStatus",
        KeyConditionExpression: "pk= :uid and #status= :status",
        ExpressionAttributeNames: {
            "#status": "status"
        },
        ExpressionAttributeValues: {
            ":uid": userId,
            ":status": status
        }
    })
}

async function get() {
    console.log("uid", userId, "tbl", DB.tableName);

    try {
        const getAllTodos = getAllTodoForUser(userId);
        const res = await ddbDocClient.send(getAllTodos);
        // const getTodo = getSpecificTodo(userId, firstTodoId);
        // const res = await ddbDocClient.send(getTodo);
        // const getInProgressTodo = getTodoByStatus(userId, 'IN_PROGRESS')
        // const res = await ddbDocClient.send(getInProgressTodo);
        console.log(res)
    }
    catch (err) {
        console.error("error getting data", err)
    }
}

get();