// eslint-disable-next-line no-undef

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
        // },
        // created_at: {
            // if assigned: returns `unrecognized DataType`
        //     defaultValue: DataTypes.NOW
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

