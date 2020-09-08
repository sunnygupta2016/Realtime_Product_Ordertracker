//web realted routes
const homeControllers = require('../app/http/controllers/homeControllers.js')
const authControllers = require('../app/http/controllers/authControllers.js')
const cartControllers = require('../app/http/controllers/customers/cartControllers.js')
function initRoutes (app)

{
app.get('/',homeControllers().index)

app.get('/login',authControllers().login)
app.get('/register',authControllers().register)

app.get('/cart',cartControllers().index)
app.post('/update-cart',cartControllers().update)



}
module.exports = initRoutes