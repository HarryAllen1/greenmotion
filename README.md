# GreenMotion

we use rust for basic maths lol

## Developing

Once you've created a project and installed dependencies with `pnpm install` (install pnpm with `npm i -g pnpm`), start a development server:

```bash
pnpm dev
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

## Inspiration

We were inspired by a bike ride we did recently, where we were interested in how much energy we actually saved by biking over driving.

## What it does

People don't realize how much energy you're wasting by transporting a huge chunk of metal around when you drive. Biking and walking are much more energy efficient, and also have the added bonus of not emitting any CO2. Our app helps people make an educated decision on whether to drive, bike, or walk by giving them vital information such as time, distance, and efficiency, based on their car model.

## How we built it

We used SvelteKit/Svelte for the frontend and backend. We used TailwindCSS for styling with the shadcn-svelte library for UI components. We used Rust for various maths calculations for efficiency statistics.

## Challenges

This was one of our team members’ first time using SvelteKit, so we had to teach him how to use the framework. This was also our first-time using Rust, and we ran into type conversion issues (you can do mathematical operations between floats and ints?). 
It was also quite a challenge figuring out how to use Google’s maps sdk, since the documentation is horrible. We also struggled to figure out make the ui flow in a way that made sense.
We also struggled to figure out how to use a fuel efficiency API (fueleconomy.gov) since we couldn’t figure out (for a while) how to get the API to return a response in JSON.

## Accomplishments that we're proud of

We thought it would be fun to incorporate some rust into our project, so for the calculations we made our own library of rust functions. We also learned how to use the Google Maps API to create a way for users to plan routes by entering a location, destination, and mode of transportation. We also learned how to use a government API called fueleconomy.gov to get data on the cars.

## What’s Next

Better UI, including information about public transportation. For UI we would make the map easier to use, and the stats more visually appealing. With public transportation, we could use an API that finds public data about bus routes, and compares its efficiency per person versus taking a car, biking, or walking. We could also make the stats easier to sort and make it easier for the user to find information that they care about more, since everyone has different interests.
