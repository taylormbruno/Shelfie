// eslint-disable-next-line no-undef
var Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
    let Books = sequelize.define('Books', {
        book_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        book_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        book_shelf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            // if assigned: returns `unrecognized DataType`
            // eslint-disable-next-line no-undef
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()')
        },
        updatedAt: {
            // if assigned: returns `unrecognized DataType`
            // eslint-disable-next-line no-undef
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
    },{
        timestamps: false
    }, {
        freezeTableName: true
    });

    Books.associate = function(models) {
        Books.belongsTo(models.User
            , {
                as: 'User'
            },
            {
                foreignKey: 'UserId'
            }
        );
        
    };

    return Books;
};

