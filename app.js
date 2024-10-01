const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const filePath = './status.txt';  // Path to the text file

// API to update the status string
app.post('/update-status', (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    // Write the status to a file
    fs.writeFile(filePath, status, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to update status' });
        }

        res.json({ message: 'Status updated successfully' });
    });
});

// API to retrieve the status string
app.get('/get-status', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve status' });
        }

        res.json({ status: data });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
