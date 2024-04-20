import users from "./Api/calories.js";
import calories from "./Api/calories.js";
import distance from "./Api/distances.js";
import goals from "./Api/goals.js";
import steps from "./Api/steps.js";
import workouts from "./Api/workout.js";

export default function apiRegister(server, mongoose) {
  // Register API routes
  users(server, mongoose);
  calories(server, mongoose);
  distance(server, mongoose);
  goals(server, mongoose);
  steps(server, mongoose);
  workouts(server, mongoose);
}