// routes/swapRoutes.js
import express from "express";
import {
  createSwapRequest,
  getIncomingSwaps,
  getOutgoingSwaps,
  acceptSwap,
  rejectSwap,
} from "../controllers/swapController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSwapRequest);
router.get("/incoming", protect, getIncomingSwaps);
router.get("/outgoing", protect, getOutgoingSwaps);
router.put("/:id/accept", protect, acceptSwap);
router.put("/:id/reject", protect, rejectSwap);

export default router;
