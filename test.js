const Snowflake = require("./index");

(async function () {
    let factory = await Snowflake.CreateSnowflake({ redis: "redis://127.0.0.1/0",key:"AABB" });
    console.log(factory.nextId());
})()