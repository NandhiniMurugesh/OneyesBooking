const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const mysql = require("mysql")
const connect = express()
connect.use(cors())
connect.use(bodyparser.json())
connect.use(express.json())
connect.use(express.static('public'))
connect.use(bodyparser.urlencoded({ extended: true }))

let databaseconnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "N@ndhu0514",
    database: "booking"

})

databaseconnection.connect(function (error) {
    if (error) {
        console.log(error)
    }
    else {
        console.log("database connected")
    }
})

// user Details
// insert into user table
connect.post('/user',(request,response)=>{
    let{fname,lname,email,phoneno,username,password}=request.body
    let sql='insert into user(fname,lname,email,phoneno,username,password) values(?,?,?,?,?,?)'
    databaseconnection.query(sql,[fname,lname,email,phoneno,username,password],(error,result)=>{
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})


//user display
connect.get('/userdisplay',(request,response)=>{
    let sql='select * from user'
    databaseconnection.query(sql,(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single data fetch - user -getsingle
connect.get('/singleuser/:uid',(request,response)=>{
    let {uid} = request.params
    let sql='select * from user where uid=?'
    databaseconnection.query(sql,[uid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
        }
        
    })
})


//update user 
connect.put('/updateuser/:uid',(request,response)=>{
    let {uid}=request.params
    let {fname,lname,phoneno,email,username,password} = request.body
    let sql='update user set fname=?,lname=?,phoneno=?,email=?,username=?,password=? where uid=?'
    databaseconnection.query(sql,[fname,lname,phoneno,email,username,password,uid],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","uid":uid})
            console.log("ok")
        }
    })
})


//delete user
connect.post('/deleteuser',(request,response)=>{
    let uid = request.body.uid 
    let sql='delete from user where uid=?'
    databaseconnection.query(sql,[uid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})


// login Page
connect.post('/login',(request,response)=>{
    let {username,password}=request.body
    let sql='select * from user where username=?'
    databaseconnection.query(sql,[username],(error,result)=>{
        if(error){
            response.send({"status":"empty_set"})
            console.log(error)
        }
       else if(result.length>0){
        var dbusername=result[0].username
        var dbpassword=result[0].password
        var uid = result[0].uid
        var fname = result[0].fname
        
                  
        if(dbusername===username && dbpassword===password ){
            response.send({"status":"success","uid":uid,"fname":fname
       
        })
              
        }
        else{
            response.send({"status":"invalid_password"})
        }
        }
        else{
            response.send({"status":"both_are_invalid"})
        }
    })

})

// Location 

// add Location - insert
// insert data in location table from addlocation
connect.post('/addloc',(request,response)=>{
    let{locname,locimage,locrating}=request.body
    let sql='insert into location(locname,locimage,locrating) values(?,?,?)'
    databaseconnection.query(sql,[locname,locimage,locrating],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
           
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
    })
})

// Location display - get all location
//location display
connect.get('/locationdisplay',(request,response)=>{
    let sql='select * from location'
    databaseconnection.query(sql,(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// Single location fetch - getsingle data  
connect.get('/singleloc/:lid',(request,response)=>{
    let {lid} = request.params
    let sql='select * from location where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
        }
        
    })
})

// location update
//update location
connect.put('/updateloc/:lid',(request,response)=>{
    let {lid}=request.params
    let {locname,locimage,locrating} = request.body
    let sql='update location set locname=?,locimage=?,locrating=? where lid=?'
    databaseconnection.query(sql,[locname,locimage,locrating,lid],(error,result)=>{
        if(error){
            response.send({"status":"location not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","lid":lid})
            console.log("ok")
        }
    })
})

//delete location
connect.post('/deleteloc',(request,response)=>{
    let lid = request.body.lid 
    let sql='delete from location where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})


// Spot
// insert spot -addspot
// insert data in spot table from addspot
connect.post('/addspot',(request,response)=>{
    let{lid,spotname,spotimage1,spotimage2,spotimage3,spotrating}=request.body
    let sql='insert into spot(lid,spotname,spotimage1,spotimage2,spotimage3,spotrating) values(?,?,?,?,?,?)'
    databaseconnection.query(sql,[lid,spotname,spotimage1,spotimage2,spotimage3,spotrating],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
    })
})

// spot display - get all
// spot display 
connect.get('/spotdisplay/:lid',(request,response)=>{
    let lid=request.params.lid
    // console.log(lid)
    let sql='select * from spot where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single spot fetch - get single
// single spot fetch
connect.get('/singlespot/:sid',(request,response)=>{
    let {sid} = request.params
    let sql='select * from spot where sid=?'
    databaseconnection.query(sql,[sid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
        }
        
    })
})

// update spot
//update spot
connect.put('/updatespot/:sid',(request,response)=>{
    let {sid}=request.params
    let {lid,spotname,spotimage1,spotimage2,spotimage3,spotrating} = request.body
    let sql='update spot set lid=?, spotname=?,spotimage1=?,spotimage2=?,spotimage3=?,spotrating=? where sid=?'
    databaseconnection.query(sql,[lid,spotname,spotimage1,spotimage2,spotimage3,spotrating,sid],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","sid":sid})
            console.log("ok")
        }
    })
})

//delete spot
connect.post('/deletespot',(request,response)=>{
    let sid = request.body.sid 
    let sql='delete from spot where sid=?'
    databaseconnection.query(sql,[sid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})


// Transport

// Insert into transport table 
connect.post('/addtrans',(request,response)=>{
    let{transname,transtype,transreview1,transreview2,transreview3,transrating,
        transimage1,transimage2,transimage3,lid,transarrivaltime,transdeparturetime,
        transprice,transstart,transdestination,transclass,transcartype,transcarseater}=request.body
    let sql='insert into transport(transname,transtype,transreview1,transreview2,transreview3,transrating,transimage1,transimage2,transimage3,lid,transarrivaltime,transdeparturetime,transprice,transstart,transdestination,transclass,transcartype,transcarseater) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    databaseconnection.query(sql,[transname,transtype,transreview1,transreview2,transreview3,transrating,transimage1,transimage2,transimage3,lid,transarrivaltime,transdeparturetime,transprice,transstart,transdestination,transclass,transcartype,transcarseater],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
    })
})

// Transport Display - get all 
connect.get('/transportdisplay',(request,response)=>{
    let sql='select * from transport'
    databaseconnection.query(sql,(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// transport single data fetch  for update

connect.get('/singletrans/:tid',(request,response)=>{
    let {tid} = request.params
    let sql='select * from transport where tid=?'
    databaseconnection.query(sql,[tid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
        }
        
    })
})

// transport Update

connect.put('/updatetrans/:tid',(request,response)=>{
    let {tid}=request.params
    let {transname,transtype,transreview1,transreview2,transreview3,transrating,transimage1,transimage2,transimage3,lid,transarrivaltime,transdeparturetime,transprice,transstart,transdestination,transclass,transcartype,transcarseater} = request.body
    let sql='update transport set transname=?,transtype=?,transreview1=?,transreview2=?,transreview3=?,transrating=?,transimage1=?,transimage2=?,transimage3=?,lid=?,transarrivaltime=?,transdeparturetime=?,transprice=?,transstart=?,transdestination=?,transclass=?,transcartype=?,transcarseater=? where tid=?'
    databaseconnection.query(sql,[transname,transtype,transreview1,transreview2,transreview3,transrating,transimage1,transimage2,transimage3,lid,transarrivaltime,transdeparturetime,transprice,transstart,transdestination,transclass,transcartype,transcarseater,tid],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","tid":tid})
            console.log("ok")
        }
    })
})

//delete transport
connect.post('/deletetrans',(request,response)=>{
    let tid = request.body.tid 
    let sql='delete from transport where tid=?'
    databaseconnection.query(sql,[tid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})


// Hotel

// insert into hotel

connect.post('/addhotel',(request,response)=>{
    let{hotelname,hotelroom,hotelroomtype,lid,hotelimage1,hotelimage2,hotelimage3,hoteloriginalprice,hoteldiscprice,hotelamenities1,hotelamenities2,hotelamenities3,hotelrating,hotelreview1,hotelreview2,hotelreview3,hotelbedtype,hoteldistance}=request.body
    let sql='insert into hotel(hotelname,hotelroom,hotelroomtype,lid,hotelimage1,hotelimage2,hotelimage3,hoteloriginalprice,hoteldiscprice,hotelamenities1,hotelamenities2,hotelamenities3,hotelrating,hotelreview1,hotelreview2,hotelreview3,hotelbedtype,hoteldistance) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    databaseconnection.query(sql,[hotelname,hotelroom,hotelroomtype,lid,hotelimage1,hotelimage2,hotelimage3,hoteloriginalprice,hoteldiscprice,hotelamenities1,hotelamenities2,hotelamenities3,hotelrating,hotelreview1,hotelreview2,hotelreview3,hotelbedtype,hoteldistance],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("ok")
        }
    })
})

// hotel display

connect.get('/hoteldisplay',(request,response)=>{
    let sql='select * from hotel'
    databaseconnection.query(sql,(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single data fetch from hotel table

connect.get('/singlehotel/:hid',(request,response)=>{
    let {hid} = request.params
    let sql='select * from hotel where hid=?'
    databaseconnection.query(sql,[hid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
        }
        
    })
})

// Hotel Update

connect.put('/updatehotel/:hid',(request,response)=>{
    let {hid}=request.params
    let {hotelname,hotelroom,hotelroomtype,lid,hotelimage1,hotelimage2,hotelimage3,hoteloriginalprice,hoteldiscprice,hotelamenities1,hotelamenities2,hotelamenities3,hotelrating,hotelreview1,hotelreview2,hotelreview3,hotelbedtype,hoteldistance} = request.body
    let sql='update hotel set hotelname=?,hotelroom=?,hotelroomtype=?,lid=?,hotelimage1=?,hotelimage2=?,hotelimage3=?,hoteloriginalprice=?,hoteldiscprice=?,hotelamenities1=?,hotelamenities2=?,hotelamenities3=?,hotelrating=?,hotelreview1=?,hotelreview2=?,hotelreview3=?,hotelbedtype=?,hoteldistance=? where hid=?'
    databaseconnection.query(sql,[hotelname,hotelroom,hotelroomtype,lid,hotelimage1,hotelimage2,hotelimage3,hoteloriginalprice,hoteldiscprice,hotelamenities1,hotelamenities2,hotelamenities3,hotelrating,hotelreview1,hotelreview2,hotelreview3,hotelbedtype,hoteldistance,hid],(error,result)=>{
        if(error){
            response.send({"status":"not_updated"})
            console.log(error)
        }
        else{
            response.send({"status":"success","hid":hid})
            console.log("ok")
        }
    })
})

//delete hotel
connect.post('/deletehotel',(request,response)=>{
    let hid = request.body.hid 
    let sql='delete from hotel where hid=?'
    databaseconnection.query(sql,[hid],(error,result)=>{
        if(error){
            response.send({"status":"error"})
            console.log(error)
        }
        else{
            response.send({"status":"success"})
            console.log("okay")
        }
    })
})

// Homepage displays

// fetch all data from spot with lid
connect.get('/spotdisplay/:lid',(request,response)=>{
    let lid=request.params.lid
    let sql='select * from spot where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})
// fetch all data from hotel with lid
connect.get('/hoteldisplay/:lid',(request,response)=>{
    let lid=request.params.lid
    let sql='select * from hotel where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})
// fetch all data from hotel with lid
connect.get('/hoteldisplay/:hid',(request,response)=>{
    let hid=request.params.hid
    console.log(hid)
    let sql='select * from hotel where hid=?'
    databaseconnection.query(sql,[hid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// fetch all data from spot with lid
connect.get('/transportdisplay/:lid',(request,response)=>{
    let lid=request.params.lid
    let sql='select * from transport where lid=?'
    databaseconnection.query(sql,[lid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// flight display

connect.get('/flight/:lid/:transtype',(request,response)=>{
    let lid=request.params.lid
    let transtype=request.params.transtype

    let sql='select * from transport where lid=? and transtype=? '
    databaseconnection.query(sql,[lid,transtype],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single flight display 
connect.get('/singleflight/:lid/:transtype/:tid',(request,response)=>{
    let lid=request.params.lid
    let tid=request.params.tid
    let transtype=request.params.transtype

    let sql='select * from transport where lid=? and transtype=? and tid=? '
    databaseconnection.query(sql,[lid,transtype,tid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// cardisplay
connect.get('/car/:lid/:transtype',(request,response)=>{
    let lid=request.params.lid
    let transtype=request.params.transtype
    let sql='select * from transport where lid=? and transtype=? '
    databaseconnection.query(sql,[lid,transtype],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single car display 
connect.get('/singlecar/:lid/:transtype/:tid',(request,response)=>{
    let lid=request.params.lid
    let tid=request.params.tid
    let transtype=request.params.transtype

    let sql='select * from transport where lid=? and transtype=? and tid=? '
    databaseconnection.query(sql,[lid,transtype,tid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// hoteldisplay
connect.get('/singlehotel/:lid/:hid',(request,response)=>{
    let lid=request.params.lid
    let hid=request.params.hid
    let sql='select * from hotel where lid=? and hid=? '
    databaseconnection.query(sql,[lid,hid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// single car display 
connect.get('/singlecar/:lid/:transtype/:tid',(request,response)=>{
    let lid=request.params.lid
    let tid=request.params.tid
    let transtype=request.params.transtype

    let sql='select * from transport where lid=? and transtype=? and tid=? '
    databaseconnection.query(sql,[lid,transtype,tid],(error,result)=>{
        if(error) {
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
           
        }
       
    })
})

// database connection
connect.listen(2205, () => {
    console.log("your server is running in port 2205")
})