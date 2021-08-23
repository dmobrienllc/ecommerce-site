const defaultAppState = {
    user: {   
              user_name: '', 
              first_name:'',
              middle_init:'',
              last_name:'',
              password:'',
              email:'',
              role: 'Standard',
              logged_in: false 
            },
    shoppingCart: { 
                    products: [], 
                    total: 300.00 
                  },
    product: {
              name : '',
              description : '',
              description_long : '',
              code :'',
              sku : '',
              category : '',
              sub_category : '',
              price : 0.00, 
              is_active : true, 
              is_deal: false, 
              inventory : [],
              images : [],
              reviews: []
    }
  }

  module.exports = defaultAppState;