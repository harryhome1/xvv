const express = require("express");
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false,
    }]
}];

app.use(express.json());

app.get('/', function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numbersofKidneys = johnKidneys.length;
    let numbersofHealthyKidneys = 0;

    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy === true) {
            numbersofHealthyKidneys += 1;
        }
    }

    const numbersofUnhealthyKidneys = numbersofKidneys - numbersofHealthyKidneys;

    res.json({
        numbersofKidneys,
        numbersofHealthyKidneys,
        numbersofUnhealthyKidneys
    });
});

app.post('/', function(req, res) {
    const isHealthy = req.body.isHealthy;

    users[0].kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: "Done hai"
    });
});

app.put('/', function(req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({
        msg: "All kidneys updated to healthy"
    });
});

app.delete('/', function(req, res) {
    if (isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                });
            }
        }

        users[0].kidneys = newKidneys;

        res.json({
            msg: "Unhealthy kidneys removed"
        });
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

function isThereAtLeastOneUnhealthyKidney() {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            return true;
        }
    }
    return false;
}

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
