[![Waffle.io - Columns and their card count](https://badge.waffle.io/lexbonder/zelda-cookbook-backend.png?columns=all)](https://waffle.io/lexbonder/zelda-cookbook-backend?utm_source=badge)

[![Build Status](https://travis-ci.org/lexbonder/zelda-cookbook-backend.svg?branch=master)](https://travis-ci.org/lexbonder/zelda-cookbook-backend)

# Legend of Zelda: Breath of the Wild Cookbook (Backend)

```
This repo is the backend database for the front end application with the same name
```

The new Legend of Zelda game features the ability to gather ingredients from around the world and cook them into different recipes. Each recipe gives Link different benefits such as recovering health and gaining resistance to cold.

This app provides an easy to use interface that allows the user to see what ingredients are required to make each recipe. No more wasting rare ingredients on failed recipes!

## Getting Started

### Prerequisites

To get a copy on your local machine you'll also need to clone down and install:

[Zelda Cookbook](https://github.com/lexbonder/zelda-cookbook)

You will also need to have [PostgreSQL](https://www.postgresql.org/docs/) and a database named `zelda_cookbook`

### Installing

Clone this repo

```
git clone https://github.com/lexbonder/zelda-cookbook-backend.git
```

Install dependencies

```
npm install
```

Start the server

```
node server.js
```

### Endpoints

Get all ingredients
`GET /api/v1/ingredients`

Example response
```json
[
  {
    "id": 1,
    "category": "food",
    "duration": "0:50",
    "effect": null,
    "hearts": "0.25",
    "name": "Acorn",
    "resale": "2",
    "type": "Seasoning",
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/6/66/BotW_Acorn_Icon.png/40px-BotW_Acorn_Icon.png?version=4e3b6b85bbb1f240eaa7b03f263bee1b",
    "created_at": "2018-04-16T18:51:19.938Z",
    "updated_at": "2018-04-16T18:51:19.938Z"
  },
  {
    "id": 2,
    "category": "food",
    "duration": "0:30",
    "effect": null,
    "hearts": "0.5",
    "name": "Apple",
    "resale": "3",
    "type": "Fruit",
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/f/f2/BotW_Apple_Icon.png/40px-BotW_Apple_Icon.png?version=f974e8c634aa8850c92c24c569bc9633",
    "created_at": "2018-04-16T18:51:19.938Z",
    "updated_at": "2018-04-16T18:51:19.938Z"
  },
  {
    "id": 3,
    "category": "food",
    "duration": "0:50",
    "effect": "Tough",
    "hearts": "0",
    "name": "Armoranth",
    "resale": "5",
    "type": "Green",
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/b/b3/BotW_Armoranth_Icon.png/40px-BotW_Armoranth_Icon.png?version=600fa20a51d67421dd0417decb942f92",
    "created_at": "2018-04-16T18:51:19.938Z",
    "updated_at": "2018-04-16T18:51:19.938Z"
  },...
]
```

Get a specific ingredient
`GET /api/v1/ingredients/:id`

Example response
```json
# /api/v1/ingredients/1

[
  {
    "id": 1,
    "category": "food",
    "duration": "0:50",
    "effect": null,
    "hearts": "0.25",
    "name": "Acorn",
    "resale": "2",
    "type": "Seasoning",
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/6/66/BotW_Acorn_Icon.png/40px-BotW_Acorn_Icon.png?version=4e3b6b85bbb1f240eaa7b03f263bee1b",
    "created_at": "2018-04-16T18:51:19.938Z",
    "updated_at": "2018-04-16T18:51:19.938Z"
  }
]
``` 

Get all recipes
`GET /api/v1/recipes`

Example response
```
[
  {
    "id": 1,
    "category": "recipe",
    "hearts": "22 ¾",
    "name": "Sneaky Fried Wild Greens",
    "notes": null,
    "resale": "0",
    "type": "Stealth",
    "duration": "30:00",
    "strength": "High",
    "ingredient1": "Silent Princess x3",
    "ingredient2": "Fairy",
    "ingredient3": "Shard of Farosh's Horn",
    "ingredient4": null,
    "ingredient5": null,
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/e/ea/BotW_Fried_Wild_Greens_Icon.png/40px-BotW_Fried_Wild_Greens_Icon.png?version=06d56c4b43a0cd674b343307c89c59b1",
    "type_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/7/76/BotW_Sneaky_Boost_Icon.png/30px-BotW_Sneaky_Boost_Icon.png?version=36e8f575c8ab7ad05f8ded0ffa41309f",
    "ingredient1_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/4/48/BotW_Silent_Princess_Icon.png/40px-BotW_Silent_Princess_Icon.png?version=eec59006535a1b43d628a822cd8ea75e",
    "ingredient2_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/9/9c/BotW_Fairy_Icon.png/40px-BotW_Fairy_Icon.png?version=f7e5ba5a76944315e77300797f00f5fe",
    "ingredient3_image": null,
    "ingredient4_image": null,
    "ingredient5_image": null,
    "ingredient1_id": 55,
    "ingredient2_id": 20,
    "ingredient3_id": null,
    "ingredient4_id": null,
    "ingredient5_id": null,
    "created_at": "2018-04-16T18:51:20.070Z",
    "updated_at": "2018-04-16T18:51:20.070Z"
  },
  {
    "id": 2,
    "category": "recipe",
    "hearts": "10",
    "name": "Sneaky Fried Wild Greens",
    "notes": null,
    "resale": "140",
    "type": "Stealth",
    "duration": "10:00",
    "strength": "High",
    "ingredient1": "Silent Princess x5",
    "ingredient2": null,
    "ingredient3": null,
    "ingredient4": null,
    "ingredient5": null,
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/e/ea/BotW_Fried_Wild_Greens_Icon.png/40px-BotW_Fried_Wild_Greens_Icon.png?version=06d56c4b43a0cd674b343307c89c59b1",
    "type_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/7/76/BotW_Sneaky_Boost_Icon.png/30px-BotW_Sneaky_Boost_Icon.png?version=36e8f575c8ab7ad05f8ded0ffa41309f",
    "ingredient1_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/4/48/BotW_Silent_Princess_Icon.png/40px-BotW_Silent_Princess_Icon.png?version=eec59006535a1b43d628a822cd8ea75e",
    "ingredient2_image": null,
    "ingredient3_image": null,
    "ingredient4_image": null,
    "ingredient5_image": null,
    "ingredient1_id": 55,
    "ingredient2_id": null,
    "ingredient3_id": null,
    "ingredient4_id": null,
    "ingredient5_id": null,
    "created_at": "2018-04-16T18:51:20.070Z",
    "updated_at": "2018-04-16T18:51:20.070Z"
  },
  {
    "id": 3,
    "category": "recipe",
    "hearts": "5",
    "name": "Sneaky Mushroom Skewer",
    "notes": null,
    "resale": "50",
    "type": "Stealth",
    "duration": "10:00",
    "strength": "High",
    "ingredient1": "Silent Shroom x5",
    "ingredient2": null,
    "ingredient3": null,
    "ingredient4": null,
    "ingredient5": null,
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/8/8a/BotW_Mushroom_Skewer_Icon.png/40px-BotW_Mushroom_Skewer_Icon.png?version=43ba9cffc948daad4fb4aa200c5c4cd7",
    "type_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/7/76/BotW_Sneaky_Boost_Icon.png/30px-BotW_Sneaky_Boost_Icon.png?version=36e8f575c8ab7ad05f8ded0ffa41309f",
    "ingredient1_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/3/36/BotW_Silent_Shroom_Icon.png/40px-BotW_Silent_Shroom_Icon.png?version=b56f4e6991e75fb1efca459f45d25558",
    "ingredient2_image": null,
    "ingredient3_image": null,
    "ingredient4_image": null,
    "ingredient5_image": null,
    "ingredient1_id": 56,
    "ingredient2_id": null,
    "ingredient3_id": null,
    "ingredient4_id": null,
    "ingredient5_id": null,
    "created_at": "2018-04-16T18:51:20.070Z",
    "updated_at": "2018-04-16T18:51:20.070Z"
  },...
]
```

Get a specific recipe
`GET /api/v1/recipes/:id`

Example response
```json
# /api/v1/recipes/1

[
  {
    "id": 1,
    "category": "recipe",
    "hearts": "22 ¾",
    "name": "Sneaky Fried Wild Greens",
    "notes": null,
    "resale": "0",
    "type": "Stealth",
    "duration": "30:00",
    "strength": "High",
    "ingredient1": "Silent Princess x3",
    "ingredient2": "Fairy",
    "ingredient3": "Shard of Farosh's Horn",
    "ingredient4": null,
    "ingredient5": null,
    "image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/e/ea/BotW_Fried_Wild_Greens_Icon.png/40px-BotW_Fried_Wild_Greens_Icon.png?version=06d56c4b43a0cd674b343307c89c59b1",
    "type_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/7/76/BotW_Sneaky_Boost_Icon.png/30px-BotW_Sneaky_Boost_Icon.png?version=36e8f575c8ab7ad05f8ded0ffa41309f",
    "ingredient1_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/4/48/BotW_Silent_Princess_Icon.png/40px-BotW_Silent_Princess_Icon.png?version=eec59006535a1b43d628a822cd8ea75e",
    "ingredient2_image": "https://d1u5p3l4wpay3k.cloudfront.net/zelda_gamepedia_en/thumb/9/9c/BotW_Fairy_Icon.png/40px-BotW_Fairy_Icon.png?version=f7e5ba5a76944315e77300797f00f5fe",
    "ingredient3_image": null,
    "ingredient4_image": null,
    "ingredient5_image": null,
    "ingredient1_id": 55,
    "ingredient2_id": 20,
    "ingredient3_id": null,
    "ingredient4_id": null,
    "ingredient5_id": null,
    "created_at": "2018-04-16T18:51:20.070Z",
    "updated_at": "2018-04-16T18:51:20.070Z"
  }
]
```

## Running the tests

This app uses [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/), and [Chai-HTTP](https://github.com/chaijs/chai-http) for testing.

You will need to create a database in PostgeSQL called `zelda_cookbook_test`

Make sure your local server is not running.

To run the tests:
```
npm test
```

## Deployment

This site is deployed with [Heroku](https://www.heroku.com/)

*https://zelda-cookbook-backend.herokuapp.com/*

## Tech Stack

* [Node.js](https://nodejs.org/en/docs/)
* [Express.js](https://expressjs.com/en/api.html)
* [Knex.js](http://knexjs.org/)
* [PostgreSQL](https://www.postgresql.org/docs/)

## Authors

* **Alex Bonder** - *lexbonder@gmail.com* - [GitHub](https://github.com/lexbonder)

* **Jeff Bender** - *j25bender@gmail.com* - [GitHub](https://github.com/j25bender)

* **Spencer Herms** - *slherms@gmail.com* - [GitHub](https://github.com/PreciseSlice)

## Acknowledgments

* Ingredient and recipe data scraped from [Zelda Wiki](https://zelda.gamepedia.com/Main_Page) and [orcz.com](http://orcz.com/Category:Breath_of_the_Wild_Wiki) using [Nightmare.js](http://www.nightmarejs.org/)

* Nintendo of America Inc.,. (2017). The Legend of Zelda: breath of the wild.