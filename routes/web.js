//web realted routes
const homeControllers = require('../app/http/controllers/homeControllers.js')
const authControllers = require('../app/http/controllers/authControllers.js')
const cartControllers = require('../app/http/controllers/customers/cartControllers.js')
const guest = require('../app/http/middlewares/guest.js')
function initRoutes (app)


{
app.get('/',homeControllers().index)

app.get('/login',guest,authControllers().login)
app.post('/login',authControllers().postLogin)
app.get('/register',guest,authControllers().register)
app.post('/register',authControllers().postRegister)
app.post('/logout',authControllers().logout)

app.get('/cart',cartControllers().index)
app.post('/update-cart',cartControllers().update)



}
module.exports = initRoutes