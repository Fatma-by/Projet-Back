const auth = async (req, res) => {
    try {
      // Vous n'avez pas besoin d'une connexion directe à la base de données ici
      res.status(201).json({ message: "you reached to private route" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  
  
  module.exports  = {auth}
  
  