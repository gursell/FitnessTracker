import Calorie from "../Models/calorieModel.js";

export default function calories(server, mongoose) {
  // GET request to list all calorie entries
  server.get("/Api/calories", async (req, res) => {
    try {
      // Retrieve all calorie entries from the database
      const calories = await Calorie.find();
      res.status(200).json({ message: "All calorie entries retrieved successfully", data: calories });
    } catch (error) {
      console.error("Error while retrieving calorie entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new calorie entry
  server.post("/Api/calories", async (req, res) => {
    try {
      const { userId, date, caloriesConsumed,  } = req.body;
      if (!userId || !date || !caloriesConsumed ) {
        return res.status(400).json({ message: "userId, date, caloriesConsumed, and caloriesBurned are required fields" });
      }
      const newCalorieEntry = new Calorie({
        userId,
        date,
        caloriesConsumed,
      
      });
      await newCalorieEntry.save();
      res.status(201).json({ message: "Calorie entry created successfully", calorieEntry: newCalorieEntry });
    } catch (error) {
      console.error("Error while creating calorie entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing calorie entry
  server.put("/api/calories/:id", async (req, res) => {
    try {
      // Update the existing calorie entry with the given ID
      const updatedCalorieEntry = await Calorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCalorieEntry) {
        return res.status(404).json({ error: "Calorie entry not found" });
      }
      res.status(200).json({ message: "Calorie entry updated successfully", data: updatedCalorieEntry });
    } catch (error) {
      console.error("Error while updating calorie entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing calorie entry
  server.delete("/Api/calories/:id", async (req, res) => {
    try {
      // Delete the existing calorie entry with the given ID
      const deletedCalorieEntry = await Calorie.findByIdAndDelete(req.params.id);
      if (!deletedCalorieEntry) {
        return res.status(404).json({ error: "Calorie entry not found" });
      }
      res.status(204).json({ message: "Calorie entry deleted successfully" });
    } catch (error) {
      console.error("Error while deleting calorie entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}