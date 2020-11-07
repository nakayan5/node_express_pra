// Node.jsのexpressの世界

const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const path = require('path')
const bodyParser = require('body-parser');

const dbPath = 'app/db/databse.sqlite3'

// リクエストのbodyをパースする設定
app.use(bodyParser.urlencoded({extended: true})) // urlがエンコードされる
app.use(bodyParser.json())　　// リクエストのbodyに渡されたJSONデータをexpressのAPIで扱える

// publicディレクレリを静的ファイル群のルートディレクトリとして設定
app.use(express.static(path.join(__dirname, 'public')))

// GET all users
app.get('/api/v1/users', (req, res) => {
    // connect database
    const db = new sqlite3.Database(dbPath)

    db.all('SELECT * FROM users', (err, rows) => {
        res.json(rows)
    })

    db.close()
})

// GET a user
// expressを使用するとidを変数のように扱える
app.get('/api/v1/users/:id', (req, res) => {
    // connect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
        if (!row) {
            res.status(404).send({error: 'not found'})
        } else {
            res.status(200).json(row)
        }
    })

    db.close()
})


// Search users matching keyword
app.get('/api/v1/search', (req, res) => {
    // connect database
    const db = new sqlite3.Database(dbPath)
    const keyword = req.query.q

    db.all(`SELECT * FROM users WHERE name LIKE "%${keyword}%"`, (err, rows) => {
        res.json(rows)
    })

    db.close()
})


// 関数
const run = async (sql, db) => {
    return new Promise((resolve, reject) => {
        // runはsqlite3のメソッド
        db.run(sql, (err) => {
            if (err) {
                return reject(err)
            } else {
                return resolve()
            }
        })
    })
}

// Create a new user
app.post('/api/v1/users', async (req, res) => {
    if (!req.body.name || req.body.name === "") {
        res.status(400).send({error: 'ユーザー名が指定されていません'})
    } else {
        // connect database
        const db = new sqlite3.Database(dbPath)
    
        const name = req.body.name
        const profile = req.body.profile ? req.body.profile : ""
        const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : ""
    
        try {
            await run(
                `INSERT INTO users (name, profile, date_of_birth) VALUES ("${name}", "${profile}, "${dateOfBirth}")`,
                db,
            )
            res.status(201).send({message: '新規ユーザーを作成しました'})
        } catch (e) {
            res.status(500).send({error: e})
        }
        db.close()
    }
})


// Update user data
app.put('/api/v1/users/:id', async (req, res) => {
    if (!req.body.name || req.body.name === "") {
        res.status(400).send({error: 'ユーザー名が指定されていません'})
    } else {
        // connect database
        const db = new sqlite3.Database(dbPath)
        const id = req.params.id
    
        // 現在のユーザー情報を取得する
        db.get(`SELECT * FROM users WHERE id = ${id}`, async (err, row) => {
            if (!row) {
                res.status(404).send({error: '指定されたユーザーが見つかりません'})
            } else {
                const name = req.body.name ? req.body.name : row.name
                const profile = req.profile ? req.body.profile : row.profile
                const dateOfBirth = req.body.date_of_birth ? req.body.date_of_birth : row.date_of_birth
                
                try {
                    await run(
                        `UPDATE users SET name="${name}", profile="${profile}", date_of_birth="${dateOfBirth}" WHERE id=${id}`,
                        db,
                    )
                    res.status(200).send({message: 'ユーザー情報を更新しました'})
                } catch (e) {
                    res.status(500).send({error: e})
                }
            }

        })

        db.close()
    }
})


// Delete user data
app.delete('/api/v1/users/:id', async (req, res) => {
    // connect database
    const db = new sqlite3.Database(dbPath)
    const id = req.params.id

    db.get(`SELECT * FROM users WHERE id = ${id}`, async (err, row) => {

        if (!row) {
            res.status(404).send({error: '指定されたユーザーが見つかりません'})
        } else {
            try {
                await run(
                    `DELETE FROM users WHERE id=${id}`,
                    db,
                )
                res.status(200).send({message: 'ユーザーを削除しました'})
            } catch (e) {
                res.status(500).send({error: e})
            }
        }
    })

    db.close()
})


const port = process.env.PORT || 3000;
app.listen(port)
console.log("listen on port:" + port);