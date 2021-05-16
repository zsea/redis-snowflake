const Snowflake = require("./snowflake"), IORedis = require("ioredis");

async function CreateSnowflake(options) {
    let key = "SNOWFLAKE_KEY";
    let redis = null,needClose=false;
    if (options.key || options.redis) {
        key = options.key || "SNOWFLAKE_KEY";
        if (typeof options.redis === "string") {
            redis = new IORedis(options.redis);
            needClose=true;
        }
        else {
            redis = options.redis;
        }
    }
    else if (typeof options === "string") {
        redis = new IORedis(redis);
        needClose=true
    }
    else {
        redis = options;
    }
    redis.defineCommand("GetNumber", {
        numberOfKeys: 1,
        lua: `local num=redis.call("INCR",KEYS[1])
        if tonumber(num)>=tonumber(ARGV[1]) then
            redis.call("SET",KEYS[1],0)
            num=0
        end
        return tonumber(num)
        `,
    });
    let num = await redis.GetNumber(key, 1024);
    if(needClose) await redis.quit();
    return new Snowflake(num & 31, num >> 5);
}

module.exports = {
    CreateSnowflake: CreateSnowflake,
    Snowflake:Snowflake
}