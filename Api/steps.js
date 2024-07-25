import Steps from "../Models/stepModel.js";
export default function steps(server, mongoose) {


  server.get("/api/steps", async (req, res) => {
  try {
    const stepsData = await Steps.find();
    res.json(stepsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ett fel inträffade", error });
  }
});


  server.post("/api/steps", async (req, res) => {
    try {
  const steps = new Steps({
    userId: req.body.userId,
    date: req.body.date,
    steps: req.body.steps
  });

 
    const newSteps = await steps.save();
    res.status(201).json(newSteps);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


  server.put("/api/steps/:id", async (req, res) => {
  try {
    const updatedSteps = await Steps.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSteps);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

server.delete("/api/steps/:id", async (req, res) => {
  try {
    const deletedSteps = await Steps.findByIdAndDelete(req.params.id);
    if (!deletedSteps) {
      return res.status(404).json({ message: 'Steps data not found' });
    }
    res.json({ message: 'Steps data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred on the server' });
  }
});

  
  // Skapar en PUT-route för att uppdatera en stegräkning med ett specifikt ID.
  server.put( '/api/stepCounts/:id', async ( req, res ) => {
    try {
      
      const updatedStepCount = await StepCount.findByIdAndUpdate( req.params.id, req.body )
  
      if ( !updatedStepCount ) {
        return res.status( 404 ).json( { message: 'Step count not found' } );
      }
      res.json( updatedStepCount );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'An error occurred on the server' } );
    }
  } );

}