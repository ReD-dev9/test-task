import { Model, Sequelize, DataTypes, CreationOptional } from 'sequelize';

export default (sequelize: Sequelize) => {
    class Task extends Model {
        declare id: number;
        declare title: string;
        declare desc: string;
        declare createdAt: CreationOptional<Date>;
        declare updatedAt: CreationOptional<Date>;
    }
    Task.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Task',
            freezeTableName: true,
        },
    );
    return Task;
};
