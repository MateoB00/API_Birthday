let db = require('../config/database');
// let jwt = require('jsonwebtoken')

class User {

    constructor(result) {
        if (result == null) {
            this._id = null
            this._firstName = null
            this._lastName = null
            this._email = null
            this._birthdayDate = null
            this._codeAdmin = null
        } else {
            this._id = result.id
            this._firstName = result.firstName
            this._lastName = result.lastName
            this._email = result.email
            this._birthdayDate = result.birthdayDate
            this._codeAdmin = result.codeAdmin || null
        }
    }

    get id() {
        return this._id
    }
    get firstName() {
        return this._firstName
    }
    get lastName() {
        return this._lastName
    }
    get email() {
        return this._email
    }
    get birthdayDate() {
        return this._birthdayDate
    }
    get codeAdmin() {
        return this._codeAdmin
    }


    set id(res) {
        this._id = res
    }

    set firstName(res) {
        this._firstName = res
    }
    set lastName(res) {
        this._lastName = res
    }
    set email(res) {
        this._email = res
    }
    set birthdayDate(res) {
        this._birthdayDate = res
    }
    set codeAdmin(res) {
        this._codeAdmin = res
    }

    static all(callback) {
        db.query('SELECT * FROM user',
            function (err, users) {
                callback(users.map((user) => new User(user)))
            })
    }

    static allWhereBirthdayAtToday(callback) {
        db.query('SELECT * FROM user WHERE MONTH(birthdayDate) = MONTH(NOW()) AND DAY(birthdayDate) = DAY(NOW())',
          function (err, users) {
            callback(users.map((user) => new User(user)))
          })
      }

    static create(firstName, lastName, email, birthdayDate) {
        db.query('INSERT INTO user (firstName, lastName, email, birthdayDate) VALUES (?,?,?,?)', [firstName, lastName, email, birthdayDate], (err, res) => {
            if (err) {
                console.error('Erreur ', err);
            } else {
                console.log('Nouvel utilisateur:', firstName);
            }
        })
    }

    static delete(id) {
        db.query('DELETE FROM user WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Erreur ', err);
            } else {
                console.log('Utilisateur supprimé');
            }
        })
    }

    static loginAdmin(codeAdmin, callback) {
        db.query('SELECT * FROM user WHERE codeAdmin = ?', [codeAdmin],
            function (err, users) {
                callback(users.map((user) => new User(user)))
            })
    }

    static checkLoginAdmin(codeAdmin, callback) {
        db.query('SELECT EXISTS(SELECT * FROM user WHERE codeAdmin = ?)', [parseInt(codeAdmin)], 
            function (err, admin) {
                const value = Object.values(admin[0])[0]
                if (value === 1) {
                    const token = jwt.sign({ codeAdmin }, process.env.JWT_KEY, { expiresIn: "1h" });

                    callback(token)
                } else {
                    return null
                }
            }
         )
    }
}
module.exports = User