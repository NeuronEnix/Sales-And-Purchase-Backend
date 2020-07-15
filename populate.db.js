require( './axios.config.js'   ) ;
const axios = require( 'axios' ) ;
const faker = require( 'faker' ) ;
const mongoose = require( 'mongoose' ) ;
const db = require( './connection.js' ) ;
db.connect() ;
mongoose.connection.dropDatabase() ;
// const { fake } = require('faker');
// const { user } = require('./validator.config.js');

const test = async  () => {
    /////////////////////////////////////////////////////////
    const users = [
        { FullName : 'Admin'   , Email : 'a', Password : 'a', Type : 'a' },
        { FullName : 'Employee', Email : 'e', Password : 'a', Type : 'e' },
    ] ;
    try{ for( user of users ) { await axios.post( '/user/signup', user ) ; } } catch( err) {};
    /////////////////////////////////////////////////////////
    const itemUnits = [ 'kg', 'g', 'ltr' ] ;
    const items = [] ;
    const itemName = new Set() ;
    for( user of users ) {
        console.log( user ) ;
        await axios.post( '/user/login', { Email : user.Email, Password : user.Password } ) ;
        for( var i = 0 ; i < 10 ; ++i ) {
            
            if( user.Type === 'a')
            for( itemUnit of itemUnits ) {
                const data = {
                    Name : faker.commerce.product(),
                    Qty  : 100+faker.random.number( 100 ), 
                    Unit : itemUnit,
                } ;
                if ( itemName.has( data.Name ) ) continue ;
                itemName.add( data.Name ) ;
                items.push( data ) ;
                try{ await axios.post( '/item/add', data ) ; } catch( err) { };
            }
        }
        /////////////////////////////////////////////////////////
        const sellerNames = [ ];
        for( var i = 0 ; i < 3 ; ++i ) { 
            const sellerName =  faker.company.companyName() ;
            sellerNames.push( sellerName ) ;
            await axios.post( '/seller/add', { Name : sellerName } ) ;
            /////////////////////////////////////////////////////////
            const purchaseData = {
                SellerName : sellerName,
                Items : []
            }
            
            for( item of items ) {
                const itemData = { Name : item.Name, Qty : 10000 + faker.random.number(100) }
                purchaseData.Items.push( itemData )
            }
            if( user.Type === 'a')
            await axios.post( '/purchase/create', purchaseData ) ;
            /////////////////////////////////////////////////////////
            let saleData = { Items : []} ;
            for( item of items ) {
                const itemData = { Name : item.Name, Qty : 10+faker.random.number(100) };
                saleData.Items.push( itemData ) ;
            }
            await axios.post( '/sale/create', { Items: saleData.Items } );
        }

    }
}
test() ;
