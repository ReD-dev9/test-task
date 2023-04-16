import { gql } from '@apollo/client';

export const createTasks = gql`
    mutation createTask($input: inputTask) {
        createTask(input: $input) {
            title
            desc
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
