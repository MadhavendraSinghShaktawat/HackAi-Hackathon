# API Documentation

## Mood Routes

### Get Mood History

GET /api/moods

Retrieves paginated mood history for the user.

**Query Parameters:**

- `page` (optional): Page number, defaults to 1
- `limit` (optional): Items per page, defaults to 10
- `startDate` (optional): Filter moods from this date (inclusive), format: YYYY-MM-DD
- `endDate` (optional): Filter moods until this date (inclusive), format: YYYY-MM-DD

**Example Requests:**

POST http://localhost:3000/api/moods
body: {
"rating": 7,
"description": "Feeling good today",
"tags": ["productive", "energetic"]
}

GET /api/moods // Gets first page with default limit (10)
GET /api/moods?page=2 // Gets second page
GET /api/moods?limit=20 // Gets first page with 20 items
GET /api/moods?page=2&limit=15 // Gets second page with 15 items per page

### Get Specific Mood Entry

GET /api/moods/:moodId

Retrieves a specific mood entry by its ID.

**URL Parameters:**

- `moodId`: The ID of the mood entry to retrieve

### Update Mood Entry

PUT /api/moods/:moodId

Updates a specific mood entry. All fields are optional, but at least one must be provided.

**URL Parameters:**

- `moodId`: The ID of the mood entry to update

**Request Body:**

json
{
"rating": 8, // Optional: number between 1-10
"description": "Updated feeling better now", // Optional: string max 500 chars
"tags": ["relaxed", "peaceful"] // Optional: array of strings
}

### Delete Mood Entry

DELETE /api/moods/:moodId

Deletes a specific mood entry.

**URL Parameters:**

- `moodId`: The ID of the mood entry to delete

### Get Mood Statistics

GET /api/moods/stats

Retrieves mood statistics and trends for the user.

**Response (200):**

### Submit Daily Check-in

POST /api/checkins

Creates a comprehensive daily check-in entry with predefined options. Limited to one check-in per day.

**Request Body:**

{
"mood": {
"rating": 8,
"description": "Happy"
},
"activities": [
"Exercise",
"Meditation",
"Work"
],
"thoughts": "Had some great insights during meditation today. Feeling focused and clear about my goals.",
"gratitude": [
{
"category": "Health",
"detail": "Feeling energetic after maintaining a consistent exercise routine"
},
{
"category": "Career",
"detail": "Grateful for the supportive team at work"
}
],
"goals": {
"completed": [
"Complete project presentation",
"30-minute workout"
],
"upcoming": [
"Start learning TypeScript",
"Plan weekend activities"
]
},
"sleep": {
"hours": 7.5,
"quality": 8
}
}

**Validation Rules:**

- Mood rating must be between 1 and 10
- Mood description must be one of the predefined options
- Select 1-5 activities from the predefined list
- Include 1-3 gratitude items, each with a category and detail
- Sleep hours must be between 0 and 24
- Sleep quality must be between 1 and 10

**Success Response (201):**

### Get Today's Check-in

GET /api/checkins/today

Retrieves the user's check-in for today if it exists.

**Success Response (200):**
