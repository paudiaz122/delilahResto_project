const { Sequelize } = require('sequelize');
const { values } = require('sequelize/types/lib/operators');
const projectDatabase = new Sequelize('delilaResto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
    logging: false,
    typeValidation: true
});

projectDatabase.authenticate()
  .then(err => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

const usersModel = projectDatabase.define('Users', {
  userId: {
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
    type: Sequelize.INTEGER,
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
  phoneNumer: {
    type: Sequelize.INTEGER,
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

const ordersModel = projectDatabase.define('Orders', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.TEXT,
    allowNull: false
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
    values: ['Realizado', 'Confirmado', 'Preparando', 'Enviado', 'Recibido']
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

const productsModel = projectDatabase.define('Orders', {
  productsId: {
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

const ordersProductsModel = projectDatabase.define('Orders', {
  orderProductId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  // orderId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // productId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  productQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  subtotalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

ordersModel.hasMany(usersModel, {foreignKey: 'userId'});
usersModel.belongsTo(ordersModel, {foreignKey: 'userId'});

ordersModel.belongsToMany(productsModel, { through: ordersProductsModel });
productsModel.belongsToMany(ordersModel, { through: ordersProductsModel });

module.exports = {
  projectDatabase,
  usersModel,
  productsModel,
  ordersModel,
  ordersProductsModel
};