import Goal from "../Models/goalModel.js";

export default function goals(server, mongoose) {
  // GET request to list all goals
  server.get("/Api/goals", async (req, res) => {
    try {
      // Retrieve all goals from the database
      const goals = await Goal.find();
      res.status(200).json({ message: "All goals retrieved successfully", data: goals });
    } catch (error) {
      console.error("Error while retrieving goals:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new goal
  server.post("/Api/goals", async (req, res) => {
    try {
      const { userId, dailyStepGoal, dailyCalorieGoal, weeklyExerciseGoal } = req.body;
      if (!userId || !dailyStepGoal || !dailyCalorieGoal || !weeklyExerciseGoal) {
        return res.status(400).json({ message: "userId, dailyStepGoal, dailyCalorieGoal, and weeklyExerciseGoal are required fields" });
      }
      const newGoal = new Goal({
        userId,
        dailyStepGoal,
        dailyCalorieGoal,
        weeklyExerciseGoal,
      });
      await newGoal.save();
      res.status(201).json({ message: "Goal created successfully", goal: newGoal });
    } catch (error) {
      console.error("Error while creating goal:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing goal
  server.put("/Api/goals/:id", async (req, res) => {
    try {
      // Update the existing goal with the given ID
      const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedGoal) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.status(200).json({ message: "Goal updated successfully", data: updatedGoal });
    } catch (error) {
      console.error("Error while updating goal:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing goal
  server.delete("/Api/goals/:id", async (req, res) => {
    try {
      // Delete the existing goal with the given ID
      const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
      if (!deletedGoal) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.status(204).json({ message: "Goal deleted successfully" });
    } catch (error) {
      console.error("Error while deleting goal:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}