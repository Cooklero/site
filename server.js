const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const nodemailer = require("nodemailer");
const multer = require('multer');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// require('dotenv').config()
// const msyql = require('mysql');
// const urlDB = 'mysql://ubc3mef4mis17fso:cz291PRvLMJuqnlk7229@bes74qefgjkoatftztph-mysql.services.clever-cloud.com:3306/bes74qefgjkoatftztph'

// const connection2 = msyql.createConnection(urlDB)

let id = 0
let UserId = 1
const transporter = nodemailer.createTransport({
   service: "yandex.ru",
   auth: {
      user: "EKZamn@yandex.ru",
      pass: "gqqjmnjeemlvgsya"
   }
});
const generateLogin = () => {
    const generatedLogin = Math.random().toString(36).substring(7);
   return generatedLogin;
  };
const setExmMail = (mail,login) =>{
const mailOptions = {
   from: "EKZamn@yandex.ru",
   to: `${mail}`,
   subject: "localhost/8081",
   html: `<h1>Ваша заявка была одобрена</h1><p>Мы рады сообщить вам, что ваша заява на регистрацию была одобрена. Ваш логин: ${login} </p><p>Для регистрации, пожалуйста, пройдите по следующей ссылке и используйте выданный вам логин.</p><a href='http://example.com'>Регистрация</a><p>После регистрации вы сможете получить доступ к личному кабинету</p><p>Если у вас возникнут вопросы или трудности, не стесняйтесь обращаться к нам по контактным данным, указанным на сайте.</p>`
};
return mailOptions
}
const sendMailTo = (mail,login) =>{
    const mailOpt = setExmMail(mail,login)
    transporter.sendMail(mailOpt, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log("Email msent: " + info.response);
    }
    });
}

const app = express();
app.use(cors());
app.use(express.json());

 const db = mysql.createConnection({
     host:"sql.freedb.tech",
     user:"freedb_Studentksr",
     password:"S?FA5YcjfEy8XXu",
     database:"freedb_Ksrforproject",
     port:"3306"
 })
 
 db.connect(err =>{
    if(err){
        console.log(err)
    }else{
        console.log("db cssoxnneted")
    }
 })

  app.get('/', (re,res)=>{
    return res.json("Бэкенд на связи")
  })
 app.listen(8081, () =>{
    console.log("Слушаю...")
})

app.post('/l', (req, res) =>{
    const sql = "SELECT * FROM `reactdb` WHERE login = ? AND password = ?;";
    console.log(req.body.login)
    console.log(req.body.password)
    db.query(sql,[req.body.login,req.body.password], (err, data) =>{
       if(err){
        console.log('Ошибка')
           return res.json("Ошибка");
       }
       if(data.length > 0){
        console.log('Вход успешен')
        return res.json(data);
       } else{
       console.log('Ошибка')
        return res.json("Ошибка")
       }
       
    })
})

app.get('/users', (req, res) =>{
    const sql = "SELECT* FROM reactdb JOIN lesson ON reactdb.id = lesson.user_id WHERE name = 'Анфалов Егор Алексеевич';";
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})
app.post('/users2', (req, res) =>{
    const sql = `SELECT * FROM reactdb  WHERE login ='${req.body.login}'`;
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    console.log(req.body.login)
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})
app.post('/usersRequests', (req, res) =>{
  const sql = "SELECT * FROM reactdb  WHERE login =' ' ";
  
  db.query(sql,(err, data) =>{
     if(err){
         return res.json("Error");
     }
     if(data.length > 0){

      return res.json(data);
     } else{
      return res.json("Faile")
     }
     
  })
})
app.post("/getAvatar", (req, res) => {
 console.log()
    const sql = `SELECT avatar FROM reactdb  WHERE id =${UserId}`;
    
    db.query(sql, (err, result) => {
      console.log(result.length)
       console.log()
      if(err){
        return res.json("Error");
      }
      if((String(result)).length> 1){
   
        const imageData = result[0].avatar.toString('base64');
        console.log(imageData)
  
        console.log(result)
        res.json(imageData);
       }else{
        return res.json("Faile")
       }
        
    
    });
  });

app.get('/topics', (req, res) =>{
    const sql = "SELECT* FROM topic ";
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})

app.get('/pr', (req, res) =>{
    const sql = "SELECT* FROM pr ";
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})

app.get('/works', (req, res) =>{
    const sql = "SELECT* FROM works ";
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})
app.get('/subjects', (req, res) =>{
    const sql = "SELECT * FROM `alllesons` ORDER BY `subject_name` ASC;";
    
    db.query(sql,(err, data) =>{
       if(err){
           return res.json("Error");
       }
       if(data.length > 0){
    
        return res.json(data);
       } else{
        return res.json("Faile")
       }
       
    })
})
app.get('/allUsers', (req, res) =>{
  const sql = "SELECT * FROM reactdb";
  
  db.query(sql,(err, data) =>{
     if(err){
         return res.json("Error");
     }
     if(data.length > 0){
  
      return res.json(data);
     } else{
      return res.json("Faile")
     }
     
  })
})
app.post('/RequestInfo', (req, res) =>{
    const sql = "INSERT INTO `reactdb` (`name`, `email`, `phone`, `organization`, `login`) VALUES (?)";
  
    const login = generateLogin()
    sendMailTo(req.body.email,login)
    const values = [
        req.body.name, 
        req.body.email,
        req.body.phone,
        req.body.org,
        login
    ]
    db.query(sql, [values], (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})
app.post('/AddSubject', (req, res) =>{
    const sql = "INSERT INTO `lesson` (`lessonName`, `user_id`) VALUES (?)";

    const values = [
        req.body.Subject, 
        req.body.Id, 
    ]
    console.log(values)
    db.query(sql, [values], (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})
app.post('/AcceptReq', (req, res) =>{
    const sql = "UPDATE `reactdb` SET `login` = ? WHERE `id` = ?";
    const login = generateLogin()
    sendMailTo(req.body.Email,login)
    const values = [ login
    ]
    db.query(sql,[ login,req.body.Id], (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})
app.post('/DeleteReq', (req, res) =>{
    const sql = "DELETE FROM `reactdb` WHERE `id` = ?";
    db.query(sql, [req.body.Id], (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})
//Запрос на добавление темы
app.post('/q', (req, res) =>{
    const sql = "INSERT INTO topic (`topicName`,`subject_id`) VALUES (?)";
    const values = [
       
        req.body.NameTop,
       req.body.TopicID,
    ]
    
    db.query(sql, [values], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
     })
})
//Запрос на добавление темы
app.post('/p', (req, res) =>{
    const sql = "INSERT INTO pr (`prName`,`prDiff`,`id_topic`) VALUES (?)";
    const values = [
        req.body.Prn,
        req.body.Prd,
       req.body.Pri,
    ]
    console.log( req.body.Prn)
    console.log( req.body.Prd)
    console.log( req.body.Pri)
    db.query(sql, [values], (err, data) =>{
        if(err){
          console.log( req.body.Pri)
            return res.json("Error");
        }
        return res.json(data);
     })
})
//Запрос на добавление темы
app.post('/lek', (req, res) =>{
    const sql = "INSERT INTO works (`title`,`id_pr`) VALUES (?)";
    const values = [
        req.body.NameLek,
        req.body.LekI,
       
    ]
 
    db.query(sql, [values], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
     })
})
app.post('/SetUserId', (req, res) => {
    UserId = req.body.Id
        console.log("User detected"+UserId)
        db.query(`SELECT * FROM works `,(error, results) => {
            if (error) {
              console.error('Erroor uploading file to database:', error);
              res.status(500).send('Error uploading file');
            } else {
              res.status(200).send('File uploaded successfully');
            }
          });
        });
app.post('/SetId', (req, res) => {
id = req.body.TaskId
    console.log(id)
    db.query(`SELECT * FROM works `,(error, results) => {
        if (error) {
          console.error('Error uploading file to database:', error);
          res.status(500).send('Error uploading file');
        } else {
          res.status(200).send('File uploaded successfully');
        }
      });
    });
    app.post('/uploadSol', upload.single('file'), (req, res) => {
        const file = req.file.buffer;
        console.log(id)
        db.query(`UPDATE works SET solution = ? WHERE id_works = ${id}`, [file],(error, results) => {
            if (error) {
              console.error('Error uploading file to database:', error);
              res.status(500).send('Error uploading file');
            } else {
              res.status(200).send('File uploaded successfully');
            }
          });
        });
        
        app.post('/getId', (req, res) => {
            console.log(id)
        
          db.query(`SELECT * FROM works WHERE id_works = ${id};`, (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).send('Internal Server Error');
              return;
            }
            return res.json(results);
            
            
          });
        });

        app.post('/uploadAvatar', upload.single('file'), (req, res) => {
            const file = req.file.buffer;
            console.log(file)
            console.log(UserId)
            db.query(`UPDATE reactdb SET avatar = ? WHERE id = ${UserId}`, [file],(error, results) => {
                if (error) {
                  console.error('Error uploading file to database:', error);
                  res.status(500).send('Error uploading file');
                } else {
                  res.status(200).send('File uploaded successfully');
                }
              });
            });

      app.get('/downloadSol', (req, res) => {
        console.log('downSol:'+id)
    
      db.query(`SELECT solution, solutName FROM works WHERE id_works = ${id};`, (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
          return;
        }
    
        const fileData = results[0].solution;
        console.log(fileData)
        console.log(results[0].solutName)
        res.setHeader('Content-Disposition', 'attachment; filename="file.docx"');
        res.setHeader('Content-Type', 'text/plain');
        res.send(fileData);
        
      });
    });
    
    app.post('/UploadSolName', (req, res) => {
      console.log(req.body.FileName)
        const sql = `UPDATE works SET solutName = '${req.body.FileName}' WHERE id_works = ${id} `;
        console.log(id)
        const values = [
            req.body.FileName,
            req.body.TaskId,
        ]
        db.query(sql, (err, data) =>{
           if(err){ 
            console.log(err)
               return res.json("Error");
           }
           return res.json(data);
        })
    })
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file.buffer;
    console.log(id)
    db.query(`UPDATE works SET file = ? WHERE id_works = ${id}`, [file],(error, results) => {
        if (error) {
          console.error('Error uploading file to database:', error);
          res.status(500).send('Error uploading file');
        } else {
          res.status(200).send('File uploaded successfully');
        }
      });
    });
    
  
  app.get('/download', (req, res) => {
  
    console.log(id)
  db.query(`SELECT file, fileName FROM works WHERE id_works = ${id};`, (error, results) => {
    console.log("file: "+id)
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const fileData = results[0].file;
    console.log("file:"+ results[0].fileName)
    res.setHeader('Content-Disposition', 'attachment; filename="file.docx"');
    res.setHeader('Content-Type', 'text/plain');
    res.send(fileData);
    
  });
});

app.post('/UploadFileName', (req, res) => {
  console.log(req.body.FileName)
    const sql = `UPDATE works SET fileName = '${req.body.FileName}' WHERE id_works = ${id} `;
    console.log(id)
    const values = [
        req.body.FileName,
        req.body.TaskId,
    ]
    db.query(sql, (err, data) =>{
       if(err){ 
        console.log(err)
           return res.json("Error");
       }
       return res.json(data);
    })
})
//Запрос на добавление темы  UploadFileName
app.post('/tasks', (req, res) =>{
    const sql = "INSERT INTO works (`title`,`id_pr`,`difficulty`,`time`,`type`,`HaveSolut`,`HaveFile`,`date`) VALUES (?)";
    const values = [
        req.body.TaskN,
        req.body.Pri,
        req.body.Diff,
        req.body.Time,
        req.body.Type,
        req.body.Sol,
        req.body.File,
        req.body.Date,
    ]
 
    db.query(sql, [values], (err, data) =>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
     })
})

app.post('/Updatetasks', (req, res) =>{
    const sql = "UPDATE `works` SET `description` = ?, `difficulty` = ?, `noteText`= ? WHERE `id_works` = ?;";
    const values = [
        req.body.title,
        
    ]
    db.query(sql, [values], (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})

app.post('/AddLesson', (req, res) =>{
    const sql = "INSERT INTO `alllesons` (`subject_name`) VALUES (?)";
   
    db.query(sql,  req.body.LessonName, (err, data) =>{
       if(err){ 
           return res.json("Error");
       }
       return res.json(data);
    })
})


app.post('/Registry', (req, res) =>{
    const sql = "UPDATE `reactdb` SET `password` = ? WHERE `login` = ?";
    const values = [
        req.body.password,
        req.body.login,
        
    ]
    db.query(sql, [req.body.password,req.body.login], (err, data) =>{
       if(err){
       
           return res.json("Error");
       }
       if(data.length > 0){
       console.log('succ')
        return res.json("Success");
       } else{
       
        return res.json("Faile")
       }
       
    })
})
