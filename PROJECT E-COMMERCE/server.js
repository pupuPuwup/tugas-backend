var mysql = require("mysql");
var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

var uniqid = require('uniqid');
const fileUpload = require('express-fileupload');
app.use(fileUpload())
app.use(express.static(__dirname + '/images'))

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })



var connection = mysql.createConnection
(
    {
        host: "localhost",
        port: 8889,
        database: "tugas_backend",
        user: "root",
        password: "root",
    }
);

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   USER   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* ============================================== USER INDEX ============================================== */

app.get('/encrypt', function(req, res)
{
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
    .update('test')
    .digest('hex');

    console.log(hash);

    res.end();
})

app.get('/adminindex', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('AdminIndex',
        {
            userAdmin : sess.userAdmin
        })
    }
})

app.get('/', function(req, res)
{
    sess = req.session;
    if(sess.idUser == null)
    {
        connection.query('SELECT * FROM season', function(err,rows,field)
        {
            res.render('IndexSeason',
            {
                data : rows,
                userName : sess.userName,
                notif : ''
            })
        })
    }
    else
    {
        connection.query('SELECT * FROM season', function(err,rows,field)
        {
            res.render('IndexSeason', 
            {
                data : rows,
                userName : sess.userName,
                notif: ''
            });
        });
    }
    
})

app.get('/category/:idSeason', function(req, res)
{
    var sql = 'SELECT * FROM category WHERE idSeason = ?';
    connection.query(sql, [req.params.idSeason], function(err, rows) 
    {
        var sql1 = 'SELECT * FROM season WHERE idSeason = ?';
        connection.query(sql1, [req.params.idSeason], function(err1, rows1) 
        {
            res.render('IndexCategory', 
            {
                data : rows,
                idSeason : req.params.idSeason,
                seasonName : rows1[0].seasonName
            });
        })
    });
})

app.get('/product/:idSeason/:idCategory', function(req, res)
{
    var sql = 'SELECT * FROM product WHERE idCategory = ?';
    connection.query(sql, [req.params.idCategory], function(err, rows) 
    {
        var sql1 = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql1, [req.params.idCategory], function(err2, rows2) 
        {
            var sql2 = 'SELECT * FROM season WHERE idSeason = ?';
            connection.query(sql2, [req.params.idSeason], function(err3, rows3) 
            {
                
                res.render('IndexProduct', 
                {
                    data : rows,
                    idCategory : req.params.idCategory,
                    seasonName : rows3[0].seasonName,
                    categoryName : rows2[0].categoryName,
                    idSeason : req.params.idSeason
                });
            });
        });
    });
})

app.get('/productdetail/:idSeason/:idCategory/:idProduct', function(req, res)
{
    var sql = 'SELECT * FROM season WHERE idSeason = ?';
    connection.query(sql, [req.params.idSeason], function(err, rows)
    {
        var sql1 = 'SELECT * FROM category WHERE idSeason = ?';
        connection.query(sql1, [req.params.idSeason], function(err1, rows1) 
        {
            var sql2 = 'SELECT * FROM product WHERE idProduct = ?';
            connection.query(sql2, [req.params.idProduct], function(err2, rows2) 
            {
                var sql3 = 'SELECT * FROM color WHERE idProduct = ?';
                connection.query(sql3, [req.params.idProduct], function(err3, rows3) 
                {
                    var sql4 = 'SELECT * FROM size WHERE idColor = ?';
                    connection.query(sql4, [req.query.color || rows3[0].idColor], function(err4, rows4) 
                    {
                        res.render('IndexDetail', 
                        {
                            data : rows,
                            data1 : rows1,
                            data2 : rows2,
                            data3 : rows3,
                            data4 : rows4,
                            seasonName : rows[0].seasonName,
                            categoryName : rows1[0].categoryName,
                            productName : rows2[0].productName,
                            colorName : rows3[0].colorName,
                            sizeName : rows4[0].sizeName,
                            idSeason : req.params.idSeason,
                            idCategory : req.params.idCategory,
                            idProduct : req.params.idProduct
                        });
                    });
                });
            });
        });
    });
})

/* ============================================== LOGIN USER ============================================== */

app.get('/register', function(req, res)
{
    res.render('UserRegis', 
    {

    });
})

app.post('/userregister', url, function(req, res)
{   
    var sql = 'SELECT * FROM user_login WHERE userName = ?';
    connection.query(sql, [req.body.userName], function (err, rows) {

        if (rows.length > 0)
        {
            res.render('UserLogin', 
            {
                notif:'Username sudah terdaftar !'
            });
        }
        else
        {
            const passwordUser = crypto.createHmac('sha256', secret)
            .update(req.body.passwordUser)
            .digest('hex');

            connection.query("INSERT INTO user_login SET ? ",
            {
                userName : req.body.userName,
                passwordUser : req.body.passwordUser,
            });

            connection.query("INSERT INTO user_data SET ? ",
            {
                name : req.body.name,
                email : req.body.email,
                phonenumber : req.body.phonenumber,
            });

            res.redirect('/');
        }
    });
})

app.get('/login', function(req, res)
{
    res.render('UserLogin',
    {
        notif : ''
    })
})

app.post('/userlogin', url, function(req, res)
{
    const passwordUser = crypto.createHmac('sha256', secret)
    .update(req.body.passwordUser)
    .digest('hex');

    var sql = 'SELECT * FROM user_login WHERE userName = ? and passwordUser = ?';
    connection.query(sql, [req.body.userName, passwordUser], function (err, rows)
    {
        if (rows.length > 0)
        {
            sess=req.session;
            sess.idUser = rows[0].idUser;
            sess.userName = rows[0].userName;

            res.redirect('/');
        }
        else
        {
            res.render('UserLogin', 
            {
                notif:'Username atau Password salah !'
            });
        }
    });
})

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   ADMIN   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */
/* ============================================== LOGIN ADMIN ============================================== */
app.get('/administrator', function(req, res)
{
    res.render('AdminLogin',
    {
        notif:''
    });
})

app.post('/adminlogin', url, function(req, res)
{
    var sql = 'SELECT * FROM admin_login WHERE userAdmin = ? AND passwordAdmin = ?';
    connection.query(sql, [req.body.userAdmin, req.body.passwordAdmin], function(err, rows) {
        
        if (rows.length > 0)
        {
            sess=req.session;
            sess.idAdmin = rows[0].idAdmin;
            sess.userAdmin = rows[0].userAdmin;

            res.redirect('/adminindex');
        }
        else
        {
            res.render('AdminLogin', 
            {
                notif:'User Admin atau Password salah !'
            });
        }
    
    })
})

app.get('/adminlogout',function(req,res)
{
    req.session.destroy(function(err) 
    {
        if(err) 
        {
            console.log(err);
        } 
        else {
            res.redirect('/administrator');
        }
    });
});

/* ============================================== INDEX ADMINISTRATOR ============================================== */
app.get('/adminindex', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('AdminIndex',
        {
            userAdmin : sess.userAdmin
        })
    }
})

/* =========================================================================== SEASON =========================================================================== */

app.get('/adminseason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("SELECT * FROM season", function(err,rows,field)
        {
            if(err) throw err;
            res.render('DataSeason', 
            {
                data : rows,
                userAdmin : sess.userAdmin
            });
        });
    }
})

/* ==================================== INPUT, EDIT DELETE SEASON ==================================== */

app.get('/inputseason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormInputSeason',
        {
            userAdmin : sess.userAdmin
        })
    }
})

app.post('/forminputseason', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("INSERT INTO season SET ?",
        {
            seasonName : req.body.seasonName
        })
        res.redirect('/adminseason')
    }
})

app.get('/editseason/:idSeason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormEditSeason',
        {
            idSeason : req.params.idSeason,
            userAdmin : sess.userAdmin
        });
    }
})

app.post('/formeditseason/:idSeason', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("UPDATE season SET ? WHERE ? ", 
        [
            {
                seasonName : req.body.seasonName
            },
            {
                idSeason : req.params.idSeason
            }
        ])
        res.redirect('/adminseason')
    }
})

app.get('/deletedataseason/:idSeason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("DELETE FROM season WHERE ? ",
        {
            idSeason : req.params.idSeason
        })
        res.redirect('/adminseason')
    }
})

/* =========================================================================== CATEGORY =========================================================================== */

app.get('/admincategory/:idSeason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idSeason = ?';
        connection.query(sql, [req.params.idSeason], function(err, rows) 
        {
            if(err) throw err;

            var sql = 'SELECT * FROM season WHERE idSeason = ?';
            connection.query(sql, [req.params.idSeason], function(err2, rows2) 
            {
                res.render('DataCategory', 
                {
                    data : rows,
                    idSeason : req.params.idSeason,
                    seasonName : rows2[0].seasonName,
                    userAdmin : sess.userAdmin
                });
            })
        });
    }
})

/* ==================================== INPUT, EDIT DELETE CATEGORY ==================================== */

app.get('/inputcategory/:idSeason', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormInputCategory',
        {
            userAdmin : sess.userAdmin,
            idSeason : req.params.idSeason
        })
    }
})

app.post('/forminputcategory/:idSeason', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("INSERT INTO category SET ?",
        {
            idSeason : req.params.idSeason,
            categoryName : req.body.categoryName
        })
        res.redirect(`/admincategory/`+ req.params.idSeason)
    }
})

app.get('/editcategory/:idCategory', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            res.render('FormEditCategory',
            {
                idCategory : req.params.idCategory,
                idSeason : rows[0].idSeason,
                userAdmin : sess.userAdmin
            });
        }); 
    }
})

app.post('/formeditcategory/:idCategory', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("UPDATE category SET ? WHERE ? ", 
        [
            {
                idSeason : req.body.idSeason,
                categoryName : req.body.categoryName
            },
            {
                idCategory : req.params.idCategory
            }
        ])
        res.redirect(`/admincategory/${req.body.idSeason}`)
    }
})

app.get('/deletedatacategory/:idCategory', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("DELETE FROM category WHERE ? ",
            {
                idCategory : req.params.idCategory
            })
        res.redirect(`/admincategory/` + rows[0].idSeason)
        });
    }
})

/* =========================================================================== PRODUCT =========================================================================== */

app.get('/adminproduct/:idSeason/:idCategory', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM product WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            var sql1 = 'SELECT * FROM category WHERE idCategory = ?';
            connection.query(sql1, [req.params.idCategory], function(err2, rows2) 
            {
                var sql2 = 'SELECT * FROM season WHERE idSeason = ?';
                connection.query(sql2, [req.params.idSeason], function(err3, rows3) 
                {
                    
                    res.render('DataProduct', 
                    {
                        data : rows,
                        idCategory : req.params.idCategory,
                        seasonName : rows3[0].seasonName,
                        categoryName : rows2[0].categoryName,
                        userAdmin : sess.userAdmin,
                        idSeason : req.params.idSeason
                    });
                });
            });
        });
    }
})

/* ==================================== INPUT, EDIT DELETE PRODUCT ==================================== */

app.get('/inputproduct/:idSeason/:idCategory', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormInputProduct',
        {
            userAdmin : sess.userAdmin,
            idCategory : req.params.idCategory,
            idSeason : req.params.idSeason
        });
    }
})

app.post('/forminputproduct/:idSeason/:idCategory', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        //
        var userFile = req.files.uploadedImage;
        //
        var fileName = uniqid() + '.' + req.files.uploadedImage.mimetype.split('/')[1];
        //mwminsHKn ile kw folder
        userFile.mv(__dirname + '/images/' + fileName, function (err)
        {

        
            connection.query("INSERT INTO product SET ?",
            {
                idCategory : req.params.idCategory,
                productName : req.body.productName,
                productDesc : req.body.productDesc,
                productImage : fileName,
                price : req.body.price
            })
        }) 
        res.redirect(`/adminproduct/`+ req.params.idSeason + '/' + req.params.idCategory)
    }
})

app.get('/editproduct/:idCategory/:idProduct', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM product WHERE idProduct = ?';
        connection.query(sql, [req.params.idProduct], function(err, rows) 
        {
            var sql2 = 'SELECT * FROM category WHERE idCategory = ?';
            connection.query(sql2, [req.params.idCategory], function(err2, rows2) 
            {
                res.render('FormEditProduct',
                {
                    idProduct : req.params.idProduct,
                    idCategory : rows[0].idCategory,
                    idSeason : rows2[0].idSeason,
                    userAdmin : sess.userAdmin
                });
            });
        }); 
    }
})

app.post('/formeditproduct/:idCategory/:idProduct', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var userFile = req.files.uploadedImage;
        var fileName = uniqid() + '.' + req.files.uploadedImage.mimetype.split('/')[1];
        //mwminsHKn ile kw folder
        userFile.mv(__dirname + '/images/' + fileName, function (err)
        {
            var sql = 'SELECT * FROM category WHERE idCategory = ?';
            connection.query(sql, [req.params.idCategory], function(err, rows) 
            {
                connection.query("UPDATE product SET ? WHERE ? ", 
                [
                    {
                        productName : req.body.productName,
                        productDesc : req.body.productDesc,
                        productImage : fileName,
                        price : req.body.price
                    },
                    {
                        idProduct : req.params.idProduct
                    }
                ])
                res.redirect(`/adminproduct/`+ rows[0].idSeason + '/' + req.params.idCategory)
            });
        }); 
    }
})

app.get('/deletedataproduct/:idCategory/:idProduct', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("DELETE FROM product WHERE ? ",
            {
                idProduct : req.params.idProduct
            })
        res.redirect(`/adminproduct/` + rows[0].idSeason + '/' + req.params.idCategory)
        });
    }
})

/* =========================================================================== COLOR =========================================================================== */

app.get('/admincolor/:idSeason/:idCategory/:idProduct', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM color WHERE idProduct= ?';
        connection.query(sql, [req.params.idProduct], function(err, rows) 
        {
            var sql1 = 'SELECT * FROM product WHERE idProduct = ?';
            connection.query(sql1, [req.params.idProduct], function(err1, rows1) 
            {
                var sql2 = 'SELECT * FROM category WHERE idCategory = ?';
                connection.query(sql2, [req.params.idCategory], function(err2, rows2) 
                {
                    var sql3 = 'SELECT * FROM season WHERE idSeason = ?';
                    connection.query(sql3, [req.params.idSeason], function(err3, rows3) 
                    {
                        res.render('DataColor', 
                        {
                            data : rows,
                            idCategory : req.params.idCategory,
                            seasonName : rows3[0].seasonName,
                            categoryName : rows2[0].categoryName,
                            productName : rows1[0].productName,
                            userAdmin : sess.userAdmin,
                            idSeason : req.params.idSeason,
                            idProduct : req.params.idProduct
                        });
                    });
                });
            });
        });
    }
})

/* ==================================== INPUT, EDIT DELETE COLOR ==================================== */

app.get('/inputcolor/:idSeason/:idCategory/:idProduct', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormInputColor',
        {
            userAdmin : sess.userAdmin,
            idSeason : req.params.idSeason,
            idCategory : req.params.idCategory,
            idProduct : req.params.idProduct
            
        });
    }
})

app.post('/forminputcolor/:idSeason/:idCategory/:idProduct', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("INSERT INTO color SET ?",
        {
            idProduct : req.params.idProduct,
            colorName : req.body.colorName
        })
        res.redirect(`/admincolor/`+ req.params.idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct)
    }
})

app.get('/editcolor/:idCategory/:idProduct/:idColor', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM color WHERE idColor = ?';
        connection.query(sql, [req.params.idColor], function(err, rows) 
        {
            var sql1 = 'SELECT * FROM product WHERE idProduct = ?';
            connection.query(sql1, [req.params.idProduct], function(err1, rows1) 
            {
                var sql2 = 'SELECT * FROM category WHERE idCategory = ?';
                connection.query(sql2, [req.params.idCategory], function(err2, rows2) 
                {
                    res.render('FormEditColor',
                    {
                        idColor : req.params.idColor,
                        idProduct : rows[0].idProduct,
                        idCategory : rows1[0].idCategory,
                        idSeason : rows2[0].idSeason,
                        userAdmin : sess.userAdmin
                    });
                });
            });
        });
    }
})

app.post('/formeditcolor/:idCategory/:idProduct/:idColor', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("UPDATE color SET ? WHERE ? ", 
            [
                {
                    colorName : req.body.colorName
                },
                {
                    idColor : req.params.idColor
                }
            ])
            res.redirect(`/admincolor/`+ rows[0].idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct)
        });    
    }
})

app.get('/deletedatacolor/:idCategory/:idProduct/:idColor', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("DELETE FROM color WHERE ? ",
            {
                idColor : req.params.idColor
            })
        res.redirect(`/admincolor/` + rows[0].idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct)
        });
    }
})

/* =========================================================================== SIZE =========================================================================== */

app.get('/adminsize/:idSeason/:idCategory/:idProduct/:idColor', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM size WHERE idColor= ?';
        connection.query(sql, [req.params.idColor], function(err, rows) 
        {
            var sql1 = 'SELECT * FROM color WHERE idColor= ?';
            connection.query(sql1, [req.params.idColor], function(err1, rows1) 
            {
                var sql2 = 'SELECT * FROM product WHERE idProduct = ?';
                connection.query(sql2, [req.params.idProduct], function(err2, rows2) 
                {
                    var sql3 = 'SELECT * FROM category WHERE idCategory = ?';
                    connection.query(sql3, [req.params.idCategory], function(err3, rows3) 
                    {
                        var sql4 = 'SELECT * FROM season WHERE idSeason = ?';
                        connection.query(sql4, [req.params.idSeason], function(err4, rows4) 
                        {
                            res.render('DataSize', 
                            {
                                data : rows,
                                seasonName : rows4[0].seasonName,
                                categoryName : rows3[0].categoryName,
                                productName : rows2[0].productName,
                                colorName : rows1[0].colorName,
                                userAdmin : sess.userAdmin,
                                idSeason : req.params.idSeason,
                                idCategory : req.params.idCategory,
                                idProduct : req.params.idProduct,
                                idColor : req.params.idColor
                            });
                        });
                    });
                });
            });
        });
    }
})

/* ==================================== INPUT, EDIT DELETE SIZE ==================================== */

app.get('/inputsize/:idSeason/:idCategory/:idProduct/:idColor', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        res.render('FormInputSize',
        {
            userAdmin : sess.userAdmin,
            idSeason : req.params.idSeason,
            idCategory : req.params.idCategory,
            idProduct : req.params.idProduct,
            idColor : req.params.idColor
            
        });
    }
})

app.post('/forminputsize/:idSeason/:idCategory/:idProduct/:idColor', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        connection.query("INSERT INTO size SET ?",
        {
            idColor : req.params.idColor,
            sizeName : req.body.sizeName,
            stock : req.body.stock
        })
        res.redirect(`/adminsize/`+ req.params.idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct + '/' + req.params.idColor)
    }
})

app.get('/editsize/:idCategory/:idProduct/:idColor/:idSize', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM size WHERE idSize = ?';
        connection.query(sql, [req.params.idSize], function(err, rows) 
        {
            var sql1 = 'SELECT * FROM color WHERE idColor = ?';
            connection.query(sql1, [req.params.idColor], function(err1, rows1) 
            {
                var sql2 = 'SELECT * FROM product WHERE idProduct = ?';
                connection.query(sql2, [req.params.idProduct], function(err2, rows2) 
                {
                    var sql3 = 'SELECT * FROM category WHERE idCategory = ?';
                    connection.query(sql3, [req.params.idCategory], function(err3, rows3) 
                    {
                        res.render('FormEditSize',
                        {
                            idSize : req.params.idSize,
                            idColor : rows[0].idColor,
                            idProduct : rows1[0].idProduct,
                            idCategory : rows2[0].idCategory,
                            idSeason : rows3[0].idSeason,
                            userAdmin : sess.userAdmin
                        });
                    });
                });
            });
        });
    }
})

app.post('/formeditsize/:idCategory/:idProduct/:idColor/:idSize', url, function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("UPDATE size SET ? WHERE ? ", 
            [
                {
                    sizeName : req.body.sizeName,
                    stock : req.body.stock
                },
                {
                    idSize : req.params.idSize
                }
            ])
            res.redirect(`/adminsize/`+ rows[0].idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct + '/' + req.params.idColor)
        });    
    }
})

app.get('/deletedatasize/:idCategory/:idProduct/:idColor/:idSize', function(req, res)
{
    sess = req.session;
    if(sess.idAdmin == null)
    {
        res.redirect('/administrator')
    }
    else
    {
        var sql = 'SELECT * FROM category WHERE idCategory = ?';
        connection.query(sql, [req.params.idCategory], function(err, rows) 
        {
            connection.query("DELETE FROM size WHERE ? ",
            {
                idSize : req.params.idSize
            })
        res.redirect(`/adminsize/` + rows[0].idSeason + '/' + req.params.idCategory + '/' + req.params.idProduct + '/' + req.params.idColor)
        });
    }
})

app.listen(4000);