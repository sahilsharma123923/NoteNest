const express=require('express')
const noteController=require('../controllers/note.controller')
const authMiddleware=require('../middleware/auth.middleware')

const router=express.Router()

router.post("/create-note",authMiddleware.authMiddleware,noteController.createNoteController);
router.get("/getnotes",authMiddleware.authMiddleware,noteController.getAllNotesController)
router.get("/notes/:id",authMiddleware.authMiddleware,noteController.getSingleNoteController)

module.exports=router