const express = require("express");
const router = express.Router();

const db = require("./dbconnection");


// GET all tasks

router.get("/", function(req, res) {

    const sql = "SELECT * FROM tasks ORDER BY id DESC";

    db.query(sql, function(error, results) {

        if (error) {

            return res.status(500).json({
                message: "Failed to fetch tasks"
            });

        }

        res.status(200).json(results);

    });

});


// POST new task

router.post("/", function(req, res) {

    const { title, description } = req.body;


    // Basic validation

    if (!title || !description) {

        return res.status(400).json({
            message: "Title and description are required"
        });

    }


    const cleanTitle = title.trim();
    const cleanDescription = description.trim();


    if (cleanTitle === "" || cleanDescription === "") {

        return res.status(400).json({
            message: "Title and description cannot be empty"
        });

    }


    const sql = `
        INSERT INTO tasks (title, description, completed)
        VALUES (?, ?, false)
    `;


    db.query(
        sql,
        [cleanTitle, cleanDescription],
        function(error, result) {

            if (error) {

                return res.status(500).json({
                    message: "Failed to add task"
                });

            }


            res.status(201).json({
                message: "Task added successfully",
                task: {
                    id: result.insertId,
                    title: cleanTitle,
                    description: cleanDescription,
                    completed: false
                }
            });

        }
    );

});


// PUT update task status

router.put("/:id", function(req, res) {

    const taskId = req.params.id;


    const sql = `
        UPDATE tasks
        SET completed = NOT completed
        WHERE id = ?
    `;


    db.query(sql, [taskId], function(error, result) {

        if (error) {

            return res.status(500).json({
                message: "Failed to update task"
            });

        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json({
            message: "Task status updated successfully"
        });

    });

});


// DELETE task

router.delete("/:id", function(req, res) {

    const taskId = req.params.id;


    const sql = "DELETE FROM tasks WHERE id = ?";


    db.query(sql, [taskId], function(error, result) {

        if (error) {

            return res.status(500).json({
                message: "Failed to delete task"
            });

        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Task not found"
            });

        }


        res.status(200).json({
            message: "Task deleted successfully"
        });

    });

});


module.exports = router;