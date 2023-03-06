require("dotenv").config();
const { Setting } = require("./db");
const db = require("./db");

(() => {
    db.connect(async () => {
        await new Setting({
              label: "DRAWS_SETTINGS",
              steps: [
                {
                  counter: 2,
                  value: 5
                },
                {
                  counter: 3,
                  value: 10
                },
                {
                  counter: 4,
                  value: 15
                },
                {
                  counter: 5,
                  value: 30
                },
                {
                  counter: 6,
                  value: 40
                }
              ]
    
    }).save();
    });

    
})();