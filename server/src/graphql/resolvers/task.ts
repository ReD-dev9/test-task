import db from '../../models';

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
        oneTask: async (root: any, { id }: { id: number }) => {
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
        createTask: async (root: any, { input }: { input: { title: string; desc: string } }) => {
            try {
                console.log(input);
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
        updateTask: async (input: any, id: number) => {
            try {
                const task = await db.models.Task.update(
                    {
                        title: input.title,
                        desc: input.desc,
                    },
                    {
                        where: { id },
                    },
                );
                if (!task) {
                    throw new Error('Update task error');
                }
                return task;
            } catch (error) {
                return error;
            }
        },
        deleteTask: async (root: any, { id }: { id: number }) => {
            try {
                await db.models.Task.destroy({
                    where: { id },
                });
            } catch (error) {
                return error;
            }
        },
    },
};
