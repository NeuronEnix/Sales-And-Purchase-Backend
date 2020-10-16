# Sales-And-Purchase-Backend

## Available Scripts

### In the project directory, you can run:

#### To install necessary modules :  `npm i`

#### To run the server : `npm start`

Runs the app in the development mode.<br />

Send request to this address [http://localhost:9999](http://localhost:9999)
Sample request to Sign In: [http://localhost:9999/user/sign-in](http://localhost:9999/user/sign-in)

Find **Request and Response Structure** : [here](https://docs.google.com/spreadsheets/d/1vqTZ1gUXocfpqFwpBZyJUOG4Hcgfby-Gue452HNODrU/edit?usp=sharing)

Note: Please visit **Request and Response Structure** for more details of api
## Available API
### User
| **URL**		| **Method**	| **Description**                                           |
| ---           | ---     		| ---                                                       |
| `/user/sign-in` | POST    		| To Sign In                                                |
| `/user/sign-up`| POST  		| To create a new user. (Only admins can create a new user) |
| `/user/sign-out`| GET  			| To log out an user ( clears token ) 						|

### Item
| **URL**			| **Method**	| **Description**                                           |
| ---           	| ---     		| ---                                                       |
| `/item/add` 		| POST 			| To add a new item 										|
| `/item/update`	| POST 			| To update item qty/unit 									|
| `/item/search`	| GET 			| To search for an item (provides auto complete) 			|
| `/item/detail`	| GET 			| To get details of the specified item 								|
| `/item/stock` 	| GET 			| To get stock list of items 								|
| `/item/purchases` | GET 			| To get the list of purchases made on the specified item 	|
| `/item/sales` 	| GET 			| To get the list of sales made on the specified item 		|

### Seller
| **URL**			| **Method**	| **Description**                                   |
| ---           	| ---     		| ---                                               |
| `/seller/add` 	| POST 			| To add a new seller 								|
| `/seller/search` 	| GET 			| To search for a seller (provides auto complete)	|

### Purchase
| **URL**					| **Method**	| **Description**                                           		|
| ---           			| ---     		| ---                                                        		|
| `/purchase/create` 		| POST 			| To create a new purchase 											|
| `/purchase/update` 		| POST 			| To update/edit purchase details 									|
| `/purchase/detail` 		| GET 			| To get details of a purchase 										|
| `/purchase/list-edits` 	| GET 			| To get updates/edits made on the purchase 						|
| `/purchase/list` 			| GET 			| To get list of purchases created  	|
| `/purchase/delete` 		| DELETE 		| To delete a purchase 												|

### Sale
| **URL**				| **Method**	| **Description**                                           	|
| ---           		| ---     		| ---                                                        	|
| `/sale/create` 		| POST 			| To create a new sale 											|
| `/sale/update` 		| POST 			| To update/edit sale details 									|
| `/sale/detail` 		| GET 			| To get details of a sale 										|
| `/sale/list-edits` 	| GET 			| To get updates/edits made on the sale 						|
| `/sale/list` 			| GET 			| To get list of sales created 	|
| `/sale/delete` 		| DELETE 		| To delete a sale 												|

### Token
| **URL**					| **Method**	| **Description**                               |
| ---           			| ---     		| ---                                           |
| `/token/acc-tok` 	| GET 			| To refresh access token 						|
| `/token/ref-tok`	| GET 			| To refresh token set in cookie as http only 	|

