// routes/eventRoutes.js
import express from "express";
import {createEvent,getMyEvents,updateEvent,deleteEvent,} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/my", protect, getMyEvents);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
