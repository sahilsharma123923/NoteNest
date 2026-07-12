const express=require('express')
const noteController=require('../controllers/note.controller')
const authMiddleware=require('../middleware/auth.middleware')

const router=express.Router()

router.post("/",authMiddleware.authMiddleware,noteController.createNoteController);
router.get("/",authMiddleware.authMiddleware,noteController.getAllNotesController)
router.get("/:id",authMiddleware.authMiddleware,noteController.getSingleNoteController)
router.put("/:id",authMiddleware.authMiddleware,noteController.updateNotecontroller)
router.put("/updateNotePinned/:id",authMiddleware.authMiddleware,noteController.updateNotePinnedController)
router.delete("/:id",authMiddleware.authMiddleware,noteController.deleteNoteController)

module.exports=router