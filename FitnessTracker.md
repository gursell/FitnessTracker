# Fitness Tracker API Documentation

Welcome to the documentation for the Fitness Tracker API. This API allows users to track their fitness activities, including workouts, steps, distances, calories burned, and personal goals.

## Overview

The Fitness Tracker API is designed to help users monitor their exercise routines and progress towards their fitness goals. Whether you're interested in logging workouts, tracking steps, calculating distances, monitoring calorie expenditure, or setting personal fitness targets, this API has you covered.

## Authentication

The Fitness Tracker API requires authentication for accessing user-specific information and functionalities. Users need to obtain an access token via the authentication endpoint to make authorized requests to the API.

## Endpoint Structure

The base URL for the Fitness Tracker API is `http://fitness-tracker-api.com/api/`.

- `/users`: Manage user accounts and information.
- `/workouts`: Log and retrieve workout activities.
- `/steps`: Track daily step counts.
- `/distances`: Record distances covered during workouts.
- `/calories`: Calculate calorie expenditure.
- `/goals`: Set and manage personal fitness goals.

## Request Parameters

### `/users`

- `user_id`: The unique identifier of the user.
- `username`: The username of the user.
- `email`: The email address of the user.
- `password`: The password for user authentication.

### `/workouts`

- `user_id`: The ID of the user who performed the workout.
- `date`: The date of the workout.
- `duration_minutes`: The duration of the workout in minutes.
- `calories_burned`: The number of calories burned during the workout.
- `type`: The type or category of the workout (e.g., running, cycling, weightlifting).

### `/steps`

- `user_id`: The ID of the user for step tracking.
- `date`: The date for which step count is recorded.
- `step_count`: The number of steps taken on the specified date.

### `/distances`

- `user_id`: The ID of the user for distance tracking.
- `date`: The date for which distance covered is recorded.
- `distance_km`: The distance covered in kilometers on the specified date.

### `/calories`

- `user_id`: The ID of the user for calorie tracking.
- `date`: The date for which calorie expenditure is recorded.
- `calories_consumed`: The number of calories consumed on the specified date.
- `calories_burned`: The number of calories burned through physical activity on the specified date.

### `/goals`

- `user_id`: The ID of the user for goal setting.
- `daily_step_goal`: The daily step target for the user.
- `daily_calorie_goal`: The daily calorie intake goal for the user.
- `weekly_exercise_goal`: The weekly exercise duration goal for the user.

## Request Examples

### Add New User

```http
POST /api/users

{
  "username": "example_user",
  "email": "example@example.com",
  "password": "example_password"
}