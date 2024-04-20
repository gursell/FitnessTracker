import User from "../Models/userModel.js";

export default function users(server, mongoose) {
  // GET request to list all users
  server.get("/api/users", async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await User.find();
      res.status(200).json({ message: "All users retrieved successfully", data: users });
    } catch (error) {
      console.error("Error while retrieving users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new user
  server.post("/api/users", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required fields" });
      }
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error while creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an existing user
  server.put("/api/users/:id", async (req, res) => {
    try {
      // Update the existing user with the given ID
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Error while updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing user
  server.delete("/api/users/:id", async (req, res) => {
    try {
      // Delete the existing user with the given ID
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error while deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}