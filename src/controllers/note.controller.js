const noteModel = require("../models/note.model");

// Create Note
async function createNoteController(req, res) {
    try {
        const { title, content } = req.body;

        const owner = req.user._id;

        const note = await noteModel.create({
            title,
            content,
            owner
        });

        return res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get All Notes
async function getAllNotesController(req, res) {
    try {
        const owner = req.user._id;

        const notes = await noteModel.find({ owner });

        return res.status(200).json({
            message: "Notes fetched successfully",
            notes
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// Get Single Note
async function getSingleNoteController(req, res) {
    try {
        const noteId = req.params.id;

        const note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        // Check ownership
        if (note.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to access this note"
            });
        }

        return res.status(200).json({
            message: "Note fetched successfully",
            note
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

// update Note
async function updateNotecontroller(req,res) {

    const noteId=req.params.id
    const {content,title}=req.body

    const note=await noteModel.findById(noteId)

    if(!note){
        return res.status(404).json({
            message:"Note not found"
        })
    }
    if(note.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message:"You are not authorized to access this note "
        })
    }
    note.title=title;
    note.content=content;

    await note.save();

    return res.status(200).json({
        message:"Note updated successfully",
        note
    })
}

// Delete Note
async function deleteNoteController(req,res){
   const noteId=req.params.id

   const note=await noteModel.findById(noteId)

   if(!note){
    return res.status(404).json({
        message:"Note not found"
    })
   }

   if(note.owner.toString() !== req.user._id.toString()){
    return res.status(403).json({
        message:"You are not authorized to acess this note"
    })
   }

   await note.deleteOne();

   return res.status(200).json({
    message:"Note delete sucessfully"
   })

}

module.exports = {
    createNoteController,
    getAllNotesController,
    getSingleNoteController,
    updateNotecontroller,
    deleteNoteController
};