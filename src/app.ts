import express from 'express';

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('FiServ Web Developer Coding Project')
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
app.post( '/api/v1/parse', (req, res) => {
    let firstName;
    let lastName;
    let clientId;

    req.body.data.replace(
        new RegExp("([A-Z]*[0]*)([A-Z]*[0]*)([1-9]*)", ""),
            ($0: string, $1: string, $2: string, $3: string) => {
                firstName = $1;
                lastName = $2;
                clientId = $3;
    });
    res.json({ 'statusCode': 200, 'data': { 'firstName': firstName, 'lastName': lastName, 'clientId': clientId } } );
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
app.post( '/api/v2/parse', (req, res) => {
    let firstName;
    let lastName;
    let clientId;

    req.body.data.replace(
        new RegExp("([A-Z]*)([0]*)([A-Z]*)([0]*)([1-9]{1,3})([0-9]*)", ""),
            ($0: string, $1: string, $2: string, $3: string, $4: string, $5: string, $6: string) => {
                firstName = $1;
                lastName = $3;
                clientId = $5 + '-' + $6;
    });
    res.json({ 'statusCode': 200, 'data': { 'firstName': firstName, 'lastName': lastName, 'clientId': clientId } } );
});

export {app};
