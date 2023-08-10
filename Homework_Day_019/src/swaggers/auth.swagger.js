/**
* @swagger
*   /api/auth/login:
*       post:
*           summary: Login
*           tags: [Auth]
*           responses:
*               200: 
*                   description: Success Login to profile
*               401:
*                   description: Unauthorized - missing or invalid bearer token
*               500:
*                   description: Internal Server Error
*                    
*/