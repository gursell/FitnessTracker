
import User from '../Models/userModel.js';

export default function user(server, mongoose) {


let isConnected = false;

  // GET-route för att hämta alla användare
  server.get( "/api/users", async ( req, res ) => {
    try {
      if ( req.query.disconnect === "true" ) {
        if ( isConnected ) {
          await mongoose.disconnect();
          isConnected = false;
        }
      } else {
        if ( !isConnected ) {
          // Reconnect
          await mongoose.connect( "mongodb+srv://unlgrsel:gursel1234@cluster0.hl9pkld.mongodb.net/FitnesTracker-Gursel" );
          isConnected = true;
        }
      }

      const users = await User.find();
      if ( users.length === 0 ) {
        return res.status( 404 ).json( { message: 'User not found' } );
      }
      res.status( 200 ).json( users );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'An error occurred on the server while fetching users', error: error.message } );
    }
  } );

  // GET route for paginated and sorted users
  server.get( '/api/users', async ( req, res ) => {
    try {
      const page = parseInt( req.query.page ) || 1; // current page
      const limit = parseInt( req.query.limit ) || 10; // items per page
      const sortField = req.query.sortField || '_id'; // field for sorting
      const sortOrder = req.query.sortOrder || 'asc'; // sorting order

      const sortOptions = {};
      sortOptions[ sortField ] = sortOrder === 'asc' ? 1 : -1;

      const totalUsers = await User.countDocuments( {} );
      const totalPages = Math.ceil( totalUsers / limit );
      const skip = ( page - 1 ) * limit;

      const users = await User.find( {} )
        .sort( sortOptions )
        .skip( skip )
        .limit( limit );

      res.status( 200 ).json( {
        users,
        currentPage: page,
        totalPages,
        totalUsers
      } );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { message: 'An error occurred', error } );
    }
  } );

  
  server.post('/api/users', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



  
  server.put('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  
  server.delete('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}