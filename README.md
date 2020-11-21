# Bootcamp-aggregator-api

This is an application to aggregate and review bootcamps.
The documentation of the Interface of this application can be found here: https://documenter.getpostman.com/view/8480127/TVev44XM

## Database Schmea

### Resource types
- Bootcamps
- Course
- Review
- User
 

### Visalization




## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```
npm i
```

## Run app

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Example database seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```
