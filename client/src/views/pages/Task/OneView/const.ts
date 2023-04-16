import { gql } from '@apollo/client';

export const oneTask = gql`
    query OneTask($oneTaskId: Int!) {
        oneTask(id: $oneTaskId) {
            id
            title
            desc
        }
    }
`;
