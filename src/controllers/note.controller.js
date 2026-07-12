const noteModel = require("../models/note.model");

// Create Note
async function createNoteController(req, res) {
    try {
        const { title, content ,tags } = req.body;

        const owner = req.user._id;

        if(!title){
            return res.status(400).json({
                message:"Title is required"
            })
        }
        if(!content){
            return res.status(400).json({
                message:"Content is required"
            })
        }

        const note = await noteModel.create({
            title,
            content,
            owner,
            tags:tags || []
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

        const notes = await noteModel.find({ owner }).sort({isPinned:-1});

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
    const {content,title,tags,isPinned}=req.body

    if(!content && !title && !tags){
        return res.status(400).json({
            message:"No changes provided"
        })
    }

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
    
    if(title) note.title=title;
    if(content) note.content=content;
    if(tags) note.tags=tags;
    if(isPinned) note.isPinned=isPinned;

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
// updte isPinned Note
async function updateNotePinnedController(req,res) {
     const noteId=req.params.id
    const {isPinned}=req.body

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
      
    note.isPinned=isPinned ;

    await note.save();

    return res.status(200).json({
        message:"Note updated successfully",
        note
    })

}

module.exports = {
    createNoteController,
    getAllNotesController,
    getSingleNoteController,
    updateNotecontroller,
    deleteNoteController,
    updateNotePinnedController
};