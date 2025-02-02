import express from 'express'; // Import express
import Children from '../components/Children.js'; // Import Children model

const router = express.Router(); // Initialize express router

// GET all children
router.get('/', async (req, res) => {
    try {
        const children = await Children.find();
        res.status(200).json(children);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a child by ID
router.get('/:id', async (req, res) => {
    try {
        const child = await Children.findById(req.params.id);
        if (!child) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(child);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Create a new child
router.post('/', async (req, res) => {
    console.log('Received Data:', req.body);

    try {
      const { firstName, lastName, birthdate, gender } = req.body;
  
      if (!firstName || !lastName || !birthdate || !gender) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const newChild = new Child({ firstName, lastName, birthdate, gender });
      await newChild.save();
  
      res.status(201).json(newChild);
    } catch (error) {
      console.error('Error adding child:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// PUT: Update a child by ID
router.put('/:id', async (req, res) => {
    const { firstName, lastName, birthdate, gender, parentId } = req.body;

    try {
        const updatedChild = await Children.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, birthdate, gender, parentId },
            { new: true, runValidators: true }
        );
        if (!updatedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json(updatedChild);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a child by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedChild = await Children.findByIdAndDelete(req.params.id);
        if (!deletedChild) return res.status(404).json({ message: 'Child not found' });
        res.status(200).json({ message: 'Child deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;