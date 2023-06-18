import db from '../../../models';
import {ITask} from './const'

export default {
    Query: {
        tasks: async () => {
            try {
                const tasks = await db.models.Task.findAll();
                if (!tasks) {
                    throw new Error('No tasks found');
                }
                return tasks;
            } catch (error) {
                return error;
            }
        },
        oneTask: async (root: any, { id }: ITask) => {
            try {
                const task = await db.models.Task.findOne({
                    where: { id },
                });

                if (!task) {
                    throw new Error('Task not found');
                }
                return task;
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        createTask: async (root: any, { input }: ITask) => {
            try {
                const task = await db.models.Task.create({
                    title: input.title,
                    desc: input.desc,
                });
                if (!task) {
                    throw new Error('Create task error');
                }
                return task;
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        updateTask: async (root: any, { id, input }: ITask) => {
            try {
                if (!id) {
                    const taskCreate = await db.models.Task.create({
                        title: input.title,
                        desc: input.desc,
                    });
                    if (!taskCreate) {
                        throw new Error('Update task error');
                    }
                    return taskCreate;
                }
                const taskUpdate = await db.models.Task.update(
                    {
                        title: input.title,
                        desc: input.desc,
                    },
                    {
                        where: { id },
                    },
                );
                if (!taskUpdate) {
                    throw new Error('Update task error');
                }
                const task = await db.models.Task.findOne({
                    where: { id },
                });
                return task;
            } catch (error) {
                return error;
            }
        },
        deleteTask: async (root: any, { id }: ITask) => {
            try {
                const task = await db.models.Task.findOne({
                    where: { id },
                });

                if (!task) {
                    throw new Error('Task not found');
                }

                await db.models.Task.destroy({
                    where: { id },
                });

                return task;
            } catch (error) {
                return error;
            }
        },
    },
};
