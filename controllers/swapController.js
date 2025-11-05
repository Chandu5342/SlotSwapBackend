// controllers/swapController.js
import SwapRequest from "../models/swapRequestModel.js";
import Event from "../models/eventModel.js";

export const createSwapRequest = async (req, res) => {
  try {
    const { mySlot, theirSlot } = req.body;

    if (!mySlot || !theirSlot)
      return res.status(400).json({ message: "Both slots are required" });

    const myEvent = await Event.findById(mySlot);
    const theirEvent = await Event.findById(theirSlot);

    if (!myEvent || !theirEvent)
      return res.status(404).json({ message: "Event not found" });

    if (myEvent.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const newSwap = await SwapRequest.create({
      requester: req.user.id,
      receiver: theirEvent.user,
      mySlot,
      theirSlot,
    });

    // mark both events as swap pending
    myEvent.status = "SWAP_PENDING";
    theirEvent.status = "SWAP_PENDING";
    await myEvent.save();
    await theirEvent.save();

    res.status(201).json(newSwap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getIncomingSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ receiver: req.user.id })
      .populate("requester", "name email")
      .populate("mySlot")
      .populate("theirSlot");
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOutgoingSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({ requester: req.user.id })
      .populate("receiver", "name email")
      .populate("mySlot")
      .populate("theirSlot");
    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const acceptSwap = async (req, res) => {
  try {
    console.log("✅ Accept swap called for:", req.params.id, "by user:", req.user.id);

    const swap = await SwapRequest.findById(req.params.id)
      .populate("mySlot")
      .populate("theirSlot")
      .populate("requester")
      .populate("receiver");

    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.receiver._id.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    swap.status = "ACCEPTED";
    await swap.save();

    // Update event ownerships
    const mySlot = await Event.findById(swap.mySlot);
    const theirSlot = await Event.findById(swap.theirSlot);

    const tempUser = mySlot.user;
    mySlot.user = theirSlot.user;
    theirSlot.user = tempUser;

    mySlot.status = "BUSY";
    theirSlot.status = "BUSY";

    await mySlot.save();
    await theirSlot.save();

    console.log("✅ Swap accepted successfully!");
    res.json({ message: "Swap accepted", swap });
  } catch (error) {
    console.error("❌ Error in acceptSwap:", error);
    res.status(500).json({ message: error.message });
  }
};

export const rejectSwap = async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap not found" });

    if (swap.receiver.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    swap.status = "REJECTED";
    await swap.save();

    await Event.findByIdAndUpdate(swap.mySlot, { status: "BUSY" });
    await Event.findByIdAndUpdate(swap.theirSlot, { status: "BUSY" });

    res.json({ message: "Swap rejected", swap });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSwappableSlots = async (req, res) => {
  try {
    const userId = req.user._id;

    const swappableSlots = await Event.find({
      status: "SWAPPABLE",
      user: { $ne: userId }, // exclude the current user's own events
    })
      .populate("user", "name email")
      .sort({ startTime: 1 });

    res.json(swappableSlots);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching swappable slots" });
  }
};