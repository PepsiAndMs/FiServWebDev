"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('FiServ Web Developer Coding Project');
});
/*
 * Extract firstName, lastName and clientID from a post.
 * firstName is 0-padded to an 8 character field
 * lastName is 0-padded to a 10 character field
 * clientId is the last 7 characters
 * assumes clientId does not start with a 0
 *
 * v1 leaves the padding
 */
app.post('/api/v1/parse', (req, res) => {
    let firstName;
    let lastName;
    let clientId;
    req.body.data.replace(new RegExp("([A-Z]*[0]*)([A-Z]*[0]*)([1-9]*)", ""), ($0, $1, $2, $3) => {
        firstName = $1;
        lastName = $2;
        clientId = $3;
    });
    res.json({ 'statusCode': 200, 'data': { 'firstName': firstName, 'lastName': lastName, 'clientId': clientId } });
});
/*
 * Extract firstName, lastName and clientID from a post.
 * firstName is 0-padded to an 8 character field
 * lastName is 0-padded to a 10 character field
 * clientId is the last 7 characters
 * assumes clientId does not start with a 0
 *
 * v2 removes the padding and formats the clientID as ###-####
 */
app.post('/api/v2/parse', (req, res) => {
    let firstName;
    let lastName;
    let clientId;
    req.body.data.replace(new RegExp("([A-Z]*)([0]*)([A-Z]*)([0]*)([1-9]{1,3})([0-9]*)", ""), ($0, $1, $2, $3, $4, $5, $6) => {
        firstName = $1;
        lastName = $3;
        clientId = $5 + '-' + $6;
    });
    res.json({ 'statusCode': 200, 'data': { 'firstName': firstName, 'lastName': lastName, 'clientId': clientId } });
});
//# sourceMappingURL=app.js.map