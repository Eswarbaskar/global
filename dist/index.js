"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const bodyParser = require('body-parser');
const client = require('./database');
const app = express();
app.use(bodyParser.json());
const port = 4000;
app.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.query('SELECT * FROM user', (err, results) => {
            if (err) {
                throw err;
            }
            res.send({
                statuscode: 200,
                data: results.rows
            });
        });
    }
    catch (error) {
        res.send({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
}));
app.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield client.query('SELECT * FROM user WHERE id = $1', [id], (err, results) => {
            if (err) {
                throw err;
            }
            res.send({
                statuscode: 200,
                data: results.rows
            });
        });
    }
    catch (error) {
        res.send({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
}));
app.post('/add-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        yield client.query('INSERT INTO user (name,email) VALUES ($1,$2) RETURNING *', [name, email], (err, results) => {
            if (err) {
                throw err;
            }
            res.send({
                statuscode: 200,
                message: "User add succfully"
            });
        });
    }
    catch (error) {
        res.send({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
}));
app.listen(port, () => { console.log('port run in 4000'); });
