import Calorie from "../Models/calorieModel.js";

export default function calories(server, mongoose) {

  // GET request to list all calorie entries
  server.get("/api/calories", async (req, res) => {
    try {
      const calories = await Calorie.find();
      res.status(200).json({ message: "All calorie entries retrieved successfully", data: calories });
    } catch (error) {
      console.error("Error while retrieving calorie entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new calorie entry
  server.post("/api/calories", async (req, res) => {
    try {
      const { userId, date, caloriesConsumed } = req.body;
      if (!userId || !date || !caloriesConsumed) {
        return res.status(400).json({ message: "userId, date, and caloriesConsumed are required fields" });
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

  // PUT route for updating a calorie entry
server.put('/api/calories/:id', async (req, res) => {
    try {
        const calorieEntry = await calories.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!calorieEntry) {
            return res.status(404).json({ message: "Calorie entry not found" });
        }
        res.status(200).json({ calorieEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error while updating calorie entry', error });
    }
});

// DELETE route for deleting a calorie entry
server.delete('/api/calories/:id', async (req, res) => {
    try {
        const calorieEntry = await Calories.findByIdAndDelete(req.params.id);
        if (!calorieEntry) {
            return res.status(404).json({ message: "Calorie entry not found" });
        }
        res.status(200).json({ message: "Calorie entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting calorie entry', error });
    }
});



}

