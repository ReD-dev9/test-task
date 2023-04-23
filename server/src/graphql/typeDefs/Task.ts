export default `#graphql
    type Task {
        id: ID
        title: String
        desc: String
    }
    
    type Query {
        tasks: [Task]
        oneTask(id: Int!): Task
    }

    type Mutation {
        createTask(input: inputTask) : Task
        updateTask(input: inputTask, id: Int) : Task
        deleteTask(id: Int!) : Task
    }

    input inputTask {
        id: ID
        title: String
        desc: String
    }
`;
