import * as Yup from 'yup';
import { gql } from '@apollo/client';

export const updateTasks = gql`
    mutation UpdateTask($updateTaskId: Int, $input: inputTask) {
        updateTask(id: $updateTaskId, input: $input) {
            id
            title
            desc
        }
    }
`;

export const tasksList = gql`
    query Query {
        tasks {
            id
            title
            desc
        }
    }
`;

export const validationTask = Yup.object().shape({
    title: Yup.string().required('Введите заголовок'),
    desc: Yup.string().required('Введите описание'),
});
