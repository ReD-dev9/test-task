import { gql } from '@apollo/client';

export const tasks = gql`
    query Query {
        tasks {
            id
            title
            desc
        }
    }
`;
