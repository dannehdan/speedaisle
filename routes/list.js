var express = require('express');
var router = express.Router();

const ListsController = require('../controllers/lists');

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '588116689693-af8duu5dpqicmdai7ovfrcr5ii9bl4qb.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

function checkAuthenticated(req, res, next){
  let token = req.cookies['session-token'];

  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  
  verify()
  .then(()=>{
    req.user = user;
    next();
  })
  .catch(err=>{
    res.redirect('/')
  })
}

/* GET list listing. */
router.get('/', checkAuthenticated, ListsController.Show);
router.post('/additem', ListsController.Add);
router.patch('/check', ListsController.Check);
router.get('/clean', ListsController.Clean);
router.get('/categoriesorder', ListsController.ShowOrder);
router.patch('/categoriesorder', ListsController.ChangeOrder);

module.exports = router;
