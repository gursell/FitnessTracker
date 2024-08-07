import Workout from "../Models/workoutModel.js";

export default function workouts(server, mongoose) {
  // GET request to list all workout entries
  server.get("/api/workouts", async (req, res) => {
    try {
      // Retrieve all workout entries from the database
      const workouts = await Workout.find();
      res.status(200).json({ message: "All workout entries retrieved successfully", data: workouts });
    } catch (error) {
      console.error("Error while retrieving workout entries:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new workout entry
  server.post("/api/workouts", async (req, res) => {
    try {
      const { userId, date, duration, caloriesBurned } = req.body;
      if (!userId || !date || !duration || !caloriesBurned) {
        return res.status(400).json({ message: "userId, date, duration, and caloriesBurned are required fields" });
      }
      const newWorkoutEntry = new Workout({
        userId,
        date,
        duration,
        caloriesBurned,
      });
      await newWorkoutEntry.save();
      res.status(201).json({ message: "Workout entry created successfully", workoutEntry: newWorkoutEntry });
    } catch (error) {
      console.error("Error while creating workout entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing workout entry
  server.put("/api/workouts/:id", async (req, res) => {
    try {
      // Update the existing workout entry with the given ID
      const updatedWorkoutEntry = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedWorkoutEntry) {
        return res.status(404).json({ error: "Workout entry not found" });
      }
      res.status(200).json({ message: "Workout entry updated successfully", data: updatedWorkoutEntry });
    } catch (error) {
      console.error("Error while updating workout entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing workout entry
  server.delete("/api/workouts/:id", async (req, res) => {
    try {
      // Delete the existing workout entry with the given ID
      const deletedWorkoutEntry = await Workout.findByIdAndDelete(req.params.id);
      if (!deletedWorkoutEntry) {
        return res.status(404).json({ error: "Workout entry not found" });
      }
      res.status(204).json({ message: "Workout entry deleted successfully" });
    } catch (error) {
      console.error("Error while deleting workout entry:", error);
      res.status(500).json({ error: "Internal server error" });
    }

  });
   // GET request to list all attractions with pagination and filtering
  server.get("/api/workouts", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of elements per page
      const sortField = req.query.sortField || "_id"; // Fields for sorting
      const sortOrder = req.query.sortOrder || "asc"; // Sorting direction

      const sortOptions = {};
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

      let query = Workout.find();

      // Apply filtering if category is provided
      const category = req.query.category;
      if (category) {
        query = query.where('category').equals(category);
      }

      // Toplam sayıyı ve sayfaları hesapla
      const totalWorkouts = await Workout.countDocuments(query.getQuery());
      const totalPages = Math.ceil(totalWorkouts / pageSize);
      const skip = (page - 1) * pageSize;

      const workouts = await query
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

      res.status(200).json({
        workouts,
        currentPage: page,
        totalPages,
        totalWorkouts
      });
    } catch (error) {
      console.error("Error while retrieving attractions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

}