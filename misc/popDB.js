const startTime = Date.now() ;
const axiosConfig = require( './axios.config' ) ;
const axios = require( 'axios' ) ;
const db = require( 'mongoose' ) ;
const dbConnection = require( '../connection.js' ) ;
const bcrypt = require( 'bcryptjs' ) ;
const _ = require( 'lodash' ) ;
const { random } = require('faker');
const userCred = []
const numberOf = {
    users:10, //Don't go more than 26
    // items : specify name of item at itemPop()
    // sellers: specify name of sellers at sellerPop()
    purchases: 50,
    sales: 50,

    purchaseUpdates: { min : 2, max: 5 },
    saleUpdates:     { min : 2, max: 5 },
}
async function ignoreCode( code ) {

}
const api = {

    user : {

        login   : async data => { return axios.defaults.headers.common['Authorization'] = ( await axios.post( '/user/sign-in' , data ) ).AccessToken },
        signup  : async data => { userCred.push( {Email:data.Email, Password:data.Password} ); return await axios.post( '/user/sign-up', data ) },

    },

    item : {

        add    : async data => { return await axios.post( '/item/add'   , data ) },
        update : async data => { return await axios.post( '/item/update', data ) },

    },

    seller : {

        add : async data => { return await axios.post( '/seller/add', data ) }, 

    },

    purchase : {

        create : async data => { return await axios.post( '/purchase/create', data ) },
        update : async data => { return await axios.post( '/purchase/update', data ) },
    },

    sale : {

        create : async data => { return await axios.post( '/sale/create', data ) },
        update : async data => { return await axios.post( '/sale/update', data ) },
        
    }

}

dbConnection.connect() ;

async function initPop() {
    await db.connection.dropDatabase() ;
    
    const UserModel = db.model( 'users' ) ;
    const user = new UserModel() ;

    const userData = {
        Email    : "Main Guy",
        Password : await bcrypt.hash( "pass", 10 ),
        FullName : 'God of all',
        Type     : 'a',
        Status   : 'a',
        UserID   : user._id,
    } ;
    
    Object.assign( user, userData ) ;
    console.log( '\n\nCreated User: ')
    console.log( user ) ;
    console.log( '\n\n')
    return await user.save() ;
}

//////////////////////////////////////////////////////////////////////////////////////////

async function userPop () {
    await api.user.login({
        Email    : 'Main Guy' ,
        Password : 'pass'
    }) ;

    for( var i = 0 ; i < numberOf.users ; ++i ) {

        // Creating Admin
        await api.user.signup({
            Email    : String.fromCharCode( 'a'.charCodeAt(0)+i ) + 'a',
            Password : "a",
            FullName : 'Admin ' + String.fromCharCode( 'a'.charCodeAt(0)+i ) ,
            Type     : 'a',
        }) ;

        // Admin login
        await api.user.login({
            Email    : String.fromCharCode( 'a'.charCodeAt(0)+i ) + 'a',
            Password : "a"
        }) ;
        
        //Creating Employee
        await api.user.signup({
            Email    : String.fromCharCode( 'a'.charCodeAt(0)+i ) + 'e',
            Password : "a",
            FullName : 'Employee ' + String.fromCharCode( 'a'.charCodeAt(0)+i ) ,
            Type     : 'e',
        }) ;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
const itemNameString = 'apple banana corn dog football basketball cycle fog perfume rom jag mug hitler whale grape chopstick lemon syringe towel weed tar bag lentil cooker dal poison chemical drug cigaret dustbin sodium calcium potassium van car bike auto motor generator engine oil petrol garbage waste material mineral lizard gorilla monkey donkey marine aeroplane ramp soma mama shampoo python java javascript node cpp candle go object mosquito housefly dragonfly vinegar salt tea sugar powder mirror egg frog gas hammer ice jackfruit kangaroo lemon mushroom network orange popcorn queen ryzen sprite television umbrella venus waterfall xylophone yesterday zebra intel processor mouse keyboard monitor speaker earphone radio goat chicken motherboard bread bottle ups power sanitizer wire switch router pen drive camera book gold silver platinum soda mango meat soap ring hat hamburger lays chewing gum glue eraser paper pencil scale eraser rubber tooth brush tiffin tub bucket water rocket performance encryption cisco king james bond iron man stuart little flame nap pork pig paddy mobile nokia' ;
const itemNameList = [...new Set( itemNameString.split( ' ' ) ) ] ;
const itemUnitList = [ 'kg', 'grm', 'unt' ] ;

async function itemPop () {
    const adminCred = userCred.filter( user => user.Email[1] === "a" ) ;
    for ( const itemName of itemNameList ) {

        await api.user.login( random.arrayElement( adminCred ) ) ;
        await api.item.add({
            Name : itemName,
            Unit : random.arrayElement( itemUnitList ) ,
            Qty  : random.number( { min:100, max:1000 } ),
        }) ;
    }
}

function getRandomItemQtyPair( qtyMinMax ) {
    const itemQtyPair = {} ;
    const noOfItems = random.number( { min: 3 , max: 10}) ;

    for( var i = 0 ; i < noOfItems ; ++i ) {
        const randomItem = random.arrayElement( itemNameList ) ;
        const randomQty = random.number( qtyMinMax ) ;
        itemQtyPair[ randomItem ] = randomQty ;
    }
    return itemQtyPair ;
}

//////////////////////////////////////////////////////////////////////////////////////////

const sellerNameList = [ ...new Set( 'thermal shop,hacker shop,black,phantom,garbage shop,shop shop,medical seller,weed shop,danger shop,retro retail,damn that seller,near seller,far seller,other seller,this seller,that seller,no seller,free seller,defective seller,selling seller,looting seller,do not buy from this seller,no item seller,forever seller,damaged product seller,loose seller,boring seller'.split( ',' ) ) ]

async function sellerPop() {
    const adminCred = userCred.filter( user => user.Email[1] === "a" ) ;

    for ( const sellerName of sellerNameList ) {
        await api.user.login( random.arrayElement( adminCred ) ) ;
        await api.seller.add({
            Name : sellerName
        }) ;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
let purchaseUpdateCount = 0
let purchaseCount = 0
async function purchasePop() {
    const adminCred = userCred.filter( user => user.Email[1] === "a" ) ;
    for ( var i = 0 ; i < numberOf.purchases ; ++i ) {
        await api.user.login( random.arrayElement( adminCred ) ) ;

        const res = await api.purchase.create({
            SellerName : random.arrayElement( sellerNameList ),
            Items : getRandomItemQtyPair( { min:100, max:1000 } )
        })
        ++purchaseCount ;
        console.log( res )

        if ( random.number( 1 ) === 1) {
            try {
                const noOfUpdates = random.number( numberOf.saleUpdates ) ;
                for( var j = 0 ; j < noOfUpdates; ++j ) {
                    await api.purchase.update({
                        PurchaseID : res.PurchaseID,
                        SellerName : random.arrayElement( sellerNameList ),
                        Items : getRandomItemQtyPair({ min:100, max:1000 }),
                    })
                    ++purchaseUpdateCount ;
                }

            } catch ( err ) {
                if ( err.code === 7 ) 
                    console.log( 'Out of stock..........................');
                else 
                    throw err ;
            }
        }
    }
}





//////////////////////////////////////////////////////////////////////////////////////////
let saleUpdateCount = 0;
let saleCount = 0
async function salePop() {
    // await db.connection.dropCollection( "sales" ) ;
    for ( var i = 0 ; i < numberOf.sales ; ++i ) {
        await api.user.login( random.arrayElement( userCred ) ) ;

        try {
            const res = await api.sale.create({
                Items : getRandomItemQtyPair( { min:10, max:100 } )
            }) ;
            ++saleCount ;
            if ( random.number( 1 ) === 1) {
                const noOfUpdates = random.number( numberOf.saleUpdates ) ;
                for( var j = 0 ; j < noOfUpdates; ++j ) {
                    await api.sale.update({
                        SaleID : res.SaleID,
                        Items : getRandomItemQtyPair( { min:10, max:100 } )
                    }) ;
                    ++saleUpdateCount;
                }
            }
        } catch ( err ) {
            if ( err.code === 7 ) 
                console.log( 'Out of stock..........................');
            else 
                throw err ;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////

let status = "All OK!!!!!!!!!!!!!!!!!!!!!"
async function test() {
    try {
        const popFunctions = [
            initPop,
            userPop,
            itemPop,
            sellerPop,
            purchasePop,
            salePop,
        ]
        for ( const popFunction of popFunctions ){
            console.log( "\n\n\n\n ----------------------------------------------")
            await popFunction() ;

        }
        console.log('\n\nAll API Executed.............')
    
    } catch ( err ) {
        console.log( err ) ;
        status = "\n\nFAILED!!!!!!!!!!!!!!!!!!!!!!!"
    } finally {
        console.log( "\n\n"+status ) ;
        console.log( 'Status: ',{
            usersCreated:userCred.length,
            itemsAdded:itemNameList.length,
            sellerAdded:sellerNameList.length,
            purchasesMade: purchaseCount,
            purchasesUpdated : purchaseUpdateCount,
            salesMade: saleCount,
            salesUpdated: saleUpdateCount,
        } )
        console.log( 'Total Time : ', (Date.now() - startTime) / 1000, 's' ) ;
        console.log( 'Avg Res Time : ', _.mean( axiosConfig.ResTS ), 'ms' ) ;
    }   

}

test()

