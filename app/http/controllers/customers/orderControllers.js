const Order = require('../../../models/order.js')
const moment = require('moment')
function orderController () {

	return {
		store(req,res){
			//validate Request
			const {phone , address } = req.body
			if(!phone || !address){
				req.flash('error', 'All fileds are required')
				return res.redirect('/cart')
			}

			const order = new Order({
				customerId: req.user._id,
				items : req.session.cart.items,
				phone: phone,
				address: address
			})
			order.save().then(result =>{
    		 	req.flash('success', 'Order Placed sucessfully')
    		 	delete req.session.cart
    		 	return res.redirect('/customer/orders')

    		 }).catch(err =>{
    		 	 req.flash('error', 'Something went wrong')
               
                return res.redirect('/cart')

    		 })

			//console.log(req.body)


		},
		 async index(req,res){
			const orders = await Order.find({ customerId: req.user._id},null,{sort:{'createdAt':-1}})
			res.render('customers/orders' , {orders:orders,moment:moment})
			//console.log(orders)
		}
	}
}
 
module.exports = orderController