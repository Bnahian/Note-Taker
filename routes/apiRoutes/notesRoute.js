const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const {
   createNewNote,
   validateNote 
  } = require('../../lib/notes');


const { 
  notes 
} = require('../../db/db');

const { 
  v4: uuidv4
 } = require('uuid');

//return all saved notes as JSON.
router.get('/notes', (req, res) => {
    let results = notes;
    console.log(results);
    res.json(results);
  });

//return the new note to the client
router.post('/notes', (req, res) => {
    // set id using uuid express package
    req.body.id = uuidv4().toString();
     // add note to json file and notes array in this function
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
    });

//remove the note with the given id property
router.delete('/notes/:id',(req, res) => {
  let noteid = req.params.id;
  let flag = false;
  for (let i =0;i<notes.length ;i++)
  {   flag = false;
      if (noteid === notes[i].id)
      {
          notes.splice(i,1);
          flag = true;
          break;
      }
  }

  if(flag)
  {
  //write all remaining notes to file db.json
  console.log(flag);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes: notes }, null, 2)
    ); 
    res.json(notes);
  } 
  else 
  {
    res.send(404);
  }
});

module.exports  = router;