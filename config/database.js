const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('delilahResto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
    logging: true,
    typeValidation: true
});

sequelize.sync({
  force: false
});

const usersModel = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fullName: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const ordersModel = sequelize.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  paymentMethod: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['Efectivo', 'Tarjeta']
  },
  state: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['Nuevo', 'Confirmado', 'Preparando', 'Enviando', 'Entregado']
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

const productsModel = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imgSrc: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

const ordersProductsModel = sequelize.define('ordersProducts', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  productQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  subtotalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

ordersModel.belongsTo(usersModel, {foreignKey: 'userId'});

ordersModel.belongsToMany(productsModel, { through: ordersProductsModel });
productsModel.belongsToMany(ordersModel, { through: ordersProductsModel });

module.exports = {
  sequelize,
  usersModel,
  productsModel,
  ordersModel,
  ordersProductsModel
};