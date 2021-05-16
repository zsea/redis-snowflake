# redis-snowflake

主要用于在Docker中部署应用时，容器需要获取自己的节点ID生成不同的```snowflake```对象，用于生成可用ID。

# 使用方法

## 安装

```
npm install --save redis-snowflake
```

## 导入

```javascript
let snowflake=await require("redis-snowflake").CreateSnowflake({redis: "redis://127.0.0.1/0",key:"AABB"});
let id=snowflake.nextId();
```