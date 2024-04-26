import Goal from "../Models/goalModel.js";

export default function goals(server, mongoose) {
  // GET request to list goals with pagination
  server.get("/api/goals", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // current page
      const limit = parseInt(req.query.limit) || 10; // items per page
      const sortField = req.query.sortField || "_id"; // fields for sorting
      const sortOrder = req.query.sortOrder || 'asc'; // sorting direction

      const sortOptions = {};
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

      const totalGoals = await Goal.countDocuments();
      const totalPages = Math.ceil(totalGoals / limit);
      const skip = (page - 1) * limit;

      const goals = await Goal.find()
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        goals,
        currentPage: page,
        totalPages,
        totalGoals
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred", error });
    }
  });

  // POST request to create a new goal
  server.post("/api/goals", async (req, res) => {
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
  server.put("/api/goals/:id", async (req, res) => {
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
  server.delete("/api/goals/:id", async (req, res) => {
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
