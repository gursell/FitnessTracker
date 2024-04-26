import Distance from "../Models/distanceModel.js";

export default function distances(server, mongoose) {
  // GET request to list all distance entries
  server.get("/api/distances", async (req, res) => {
    try {
      // Retrieve all distance entries from the database
      const distances = await Distance.find();
      res.status(200).json({ message: "All distance entries retrieved successfully", data: distances });
    } catch (error) {
      console.error("Error while retrieving distance entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new distance entry
  server.post("/api/distances", async (req, res) => {
    try {
      const { userId, date, distanceKm } = req.body;
      if (!userId || !date || !distanceKm) {
        return res.status(400).json({ message: "userId, date, and distanceKm are required fields" });
      }
      const newDistanceEntry = new Distance({
        userId,
        date,
        distanceKm,
      });
      await newDistanceEntry.save();
      res.status(201).json({ message: "Distance entry created successfully", distanceEntry: newDistanceEntry });
    } catch (error) {
      console.error("Error while creating distance entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing distance entry
  server.put("/api/distances/:id", async (req, res) => {
    try {
      // Update the existing distance entry with the given ID
      const updatedDistanceEntry = await Distance.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDistanceEntry) {
        return res.status(404).json({ error: "Distance entry not found" });
      }
      res.status(200).json({ message: "Distance entry updated successfully", data: updatedDistanceEntry });
    } catch (error) {
      console.error("Error while updating distance entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing distance entry
  server.delete("/api/distances/:id", async (req, res) => {
    try {
      // Delete the existing distance entry with the given ID
      const deletedDistanceEntry = await Distance.findByIdAndDelete(req.params.id);
      if (!deletedDistanceEntry) {
        return res.status(404).json({ error: "Distance entry not found" });
      }
      res.status(204).json({ message: "Distance entry deleted successfully" });
    } catch (error) {
      console.error("Error while deleting distance entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}