const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');


const app = express();

const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./model/product')
const User = require('./model/user')
const Cart = require('./model/cart')
const CartItem = require('./model/cart-item')
const Order = require('./model/order')
const OrderItem = require('./model/order-item')

app.set('view engine','ejs')
app.set('views','views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if(!user) {
            User.create({name: 'Prathamesh', email: 'prathamesh@gmail.com'})
        }
        return user
    })
    .then(user => {
        return user.createCart()
        
    })
    .then(cart => {
        app.listen(3001, () => {
            console.log("App started on port 3001")
        });
    })
    .catch(err => {
        console.log(err)
    })