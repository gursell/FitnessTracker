import Step from "../Models/stepModel.js";

export default function steps(server, mongoose) {
  // GET request to list all step entries
  server.get("/api/steps", async (req, res) => {
    try {
      // Retrieve all step entries from the database
      const steps = await Step.find();
      res.status(200).json({ message: "All step entries retrieved successfully", data: steps });
    } catch (error) {
      console.error("Error while retrieving step entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new step entry
  server.post("/api/steps", async (req, res) => {
    try {
      const { userId, date, stepCount } = req.body;
      if (!userId || !date || !stepCount) {
        return res.status(400).json({ message: "userId, date, and stepCount are required fields" });
      }
      const newStepEntry = new Step({
        userId,
        date,
        stepCount,
      });
      await newStepEntry.save();
      res.status(201).json({ message: "Step entry created successfully", stepEntry: newStepEntry });
    } catch (error) {
      console.error("Error while creating step entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing step entry
  server.put("/api/steps/:id", async (req, res) => {
    try {
      // Update the existing step entry with the given ID
      const updatedStepEntry = await Step.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedStepEntry) {
        return res.status(404).json({ error: "Step entry not found" });
      }
      res.status(200).json({ message: "Step entry updated successfully", data: updatedStepEntry });
    } catch (error) {
      console.error("Error while updating step entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing step entry
  server.delete("/api/steps/:id", async (req, res) => {
    try {
      // Delete the existing step entry with the given ID
      const deletedStepEntry = await Step.findByIdAndDelete(req.params.id);
      if (!deletedStepEntry) {
        return res.status(404).json({ error: "Step entry not found" });
      }
      res.status(204).json({ message: "Step entry deleted successfully" });
    } catch (error) {
      console.error("Error while deleting step entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}