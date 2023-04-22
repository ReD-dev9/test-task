import { gql } from '@apollo/client';

export const deleteTasks = gql`
    mutation DeleteTask($deleteTaskId: Int!) {
        deleteTask(id: $deleteTaskId) {
            id
        }
    }
`;
