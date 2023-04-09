import db from "../../models";

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
    },
};
