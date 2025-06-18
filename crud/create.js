import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from "../dynamo-client.js";
import { v4 as uuid } from 'uuid';
import { DB, Users } from "../constants.js"

const userId = Users[0] // uuid();

const todo = {
    userId,
    todoId: `TODO-${uuid()}`,
    title: 'first todo'
}

// async function createTodo(todo) {
//     console.log("todo", todo)
//     const input = new PutItemCommand({
//         TableName: constants.tableName,
//         Item: {
//             "pk": {
//                 "S": todo.userId
//             },
//             "sk": {
//                 "S": todo.todoId
//             },
//             "title": {
//                 "S": todo.title
//             }
//         },

//         "ReturnConsumedCapacity": "TOTAL",
//     });
//     console.log("input", input)
//     const res = await client.send(input)
//     console.log(res);
// }

// createTodo(todo);

// using @aws-sdk/lib-dynamodb
import { ddbDocClient } from "../dynamo-client.js";
import { PutCommand } from '@aws-sdk/lib-dynamodb';

async function createTodoUsingLib(todo) {
    console.log("todo", todo)
    const { userId, todoId, ...todoItems } = todo;
    // console.log("items", todoItems)
    const input = new PutCommand({
        TableName: DB.tableName,
        Item: {
            "pk": todo.userId,
            "sk": todo.todoId,
            ...todoItems
        },

        "ReturnConsumedCapacity": "TOTAL",
    });
    console.log("input", input)
    const res = await ddbDocClient.send(input)
    console.log("res", res);
}

// createTodoUsingLib(todo);

createTodoUsingLib({
    userId,
    todoId: `TODO-${uuid()}`,
    title: 'second todo',
    dueDate: '2025-05-23'
});

createTodoUsingLib({
    userId,
    todoId: `TODO-${uuid()}`,
    title: 'third todo',
    status: 'TODO',
    dueDate: '2025-06-23'
});