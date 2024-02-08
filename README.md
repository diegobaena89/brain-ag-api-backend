<div align="center">

![BRAIN-AG-API-BACKEND Banner](https://github.com/diegobaena89/brain-ag-api-backend/blob/main/src/assets/brain-ag-api.png?raw=true)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/postgresql-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)

[Project](#project) | [API Endpoints](#api-endpoints) | [How to Run](#how-to-run)| [Swagger](#swagger)

</div>

📝 <a id="project"> **Project Description** </a>

This project serves as the backend for the Brain Agriculture web app developed by Brain AG Company. It provides a RESTful API for managing and retrieving data related to agricultural farms.

---

🚜 <a id="api-endpoints"> **API Endpoints** </a>

| Endpoint             | Método | Descrição                 |
| -------------------- | ------ | ------------------------- |
| `/farms`             | GET    | Get all farms             |
| `/farms/:id`         | GET    | Get farm by ID            |
| `/farms-total`       | GET    | Get total number of farms |
| `/farms`             | POST   | Add a new farm            |
| `/farms/:id`         | PUT    | Edit an existing farm     |
| `/farms/:id`         | DELETE | Delete a farm             |
| `/dashboard-state`   | GET    | List farms by state       |
| `/dashboard-culture` | GET    | List farms by culture     |
| `/dashboard-solo`    | GET    | List farms by soil        |

**Example JSON for Adding a Farm:**

```json
{
  "document": "11.510.223/0001-15",
  "productor_name": "Ronaldo Fenomeno",
  "farm_name": "Fazenda Três",
  "state": "São Paulo",
  "city": "Itu",
  "total_area": 100,
  "area_agriculture": 80,
  "area_vegetation": 20,
  "cultures": ["Soja", "Cana"]
}
```

---

<a id="swagger"> **Swagger Documentation** </a>

Explore the API using Swagger documentation. The API documentation provides details about available endpoints, request parameters, and response formats.

#### Access Swagger UI

Visit the Swagger UI to interactively explore and test the Brain-AG API:

[Brain-AG Swagger UI](http://localhost:3000/api-docs)

#### How to Use

1. Open the Swagger UI link in your browser.
2. Browse through available endpoints, request/response examples, and parameter details.
3. Test API endpoints directly within the Swagger UI.

Feel free to use the Swagger documentation to understand and interact with the Brain-AG API effortlessly.

---

📂 <a id="launch"> **How to start this project** </a>

       # Clone this repo
    ❯ git clone https://github.com/diegobaena89/brain-ag-api-backend

    # Enter on its directory
    ❯ cd brain-ag-api-backend

    # Launch the Application
    ❯ yarn dev/npm run dev
