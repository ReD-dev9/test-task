import { gql } from '@apollo/client';

export const deleteTasks = gql`
    mutation DeleteTask($deleteTaskId: Int!) {
        deleteTask(id: $deleteTaskId) {
            id
        }
    }
`;

export const tasksList = gql`
    query Query {
        tasks {
            title
            desc
        }
    }
`;
