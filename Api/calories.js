import express from 'express';
import mongoose from 'mongoose';
import Calorie from '../Models/calorieModel.js';

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://unlgrsel:gursel1234@cluster0.hl9pkld.mongodb.net/FitnessTracker-Gursel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  console.log("Connected to the database successfully");
});

// POST route to create a new calorie record
 app.post("/api/calories", async (req, res) => {
    try {
      const calories = new Calorie({
        userId: req.body.userId,
        date: req.body.date,
        caloriesConsumed: req.body.calories
      });

      const newCalories = await calories.save();
      res.status(201).json(newCalories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// PUT route to update a calorie record
app.put('/api/calories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if the updateData contains at least one field to update
        if (!Object.keys(updateData).length) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const updatedCalorie = await Calorie.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCalorie) {
            return res.status(404).json({ message: 'Calorie record not found' });
        }

        res.status(200).json(updatedCalorie);
    } catch (error) {
        console.error('Error while updating calorie record:', error);
        res.status(500).json({ message: 'An error occurred while updating the calorie record', error: error.message });
    }
});

// DELETE route to delete a calorie record
app.delete('/api/calories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedCalorie = await Calorie.findByIdAndDelete(id);

        if (!deletedCalorie) {
            return res.status(404).json({ message: 'Calorie record not found' });
        }

        res.status(204).json({ message: 'Calorie record deleted successfully' });
    } catch (error) {
        console.error('Error while deleting calorie record:', error);
        res.status(500).json({ message: 'An error occurred while deleting the calorie record', error: error.message });
    }
});

// GET route to retrieve all calorie records
app.get('/api/calories', async (req, res) => {
    try {
        const calories = await Calorie.find({});
        res.status(200).json(calories);
    } catch (error) {
        console.error('Error while retrieving calorie records:', error);
        res.status(500).json({ message: 'An error occurred while retrieving calorie records', error: error.message });
    }
});

// GET route to retrieve a specific calorie record by ID
app.get('/api/calories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const calorie = await Calorie.findById(id);

        if (!calorie) {
            return res.status(404).json({ message: 'Calorie record not found' });
        }

        res.status(200).json(calorie);
    } catch (error) {
        console.error('Error while retrieving calorie record:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the calorie record', error: error.message });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
