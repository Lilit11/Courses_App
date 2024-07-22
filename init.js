const Database = require("better-sqlite3")
const db = new Database("courses.db")
const dbLec = new Database("lecturers.db")


db.exec(`
    CREATE TABLE IF NOT EXISTS courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        duration INTEGER,
        price INTEGER,
        cover TEXT
    )

`)

//db.exec("drop table if exists courses")
db.exec(`
    CREATE TABLE IF NOT EXISTS modules(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        duration INTEGER,
        courseId INTEGER,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    )
`)