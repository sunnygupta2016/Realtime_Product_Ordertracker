const Menu = require('../../models/menu.js')
function homeControllers (){
    return {
    	async index(req,res){

    		const pizzas = await Menu.find()
    		//console.log(pizzas)
    		res.render('home', {pizzas:pizzas})

    		//Menu.find().then (function(pizzas){
    		//	console.log(pizzas)
    		//	
    		//})
    		

    	}
    }
}

module.exports = homeControllers