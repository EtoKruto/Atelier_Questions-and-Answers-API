# Atelier - Questions and Answers API

<div align="center">
  <a href="https://github.com/Backend-Architecture-Design-Atelier/Atelier---Questions-and-Answers-API">
    <img src="https://cdn.shopify.com/s/files/1/0015/6611/3861/files/Untitled-1-01_600x.png?v=1632843012" alt="Logo" height="120">
  </a>

  <h3 align="center">Questions and Answers API</h3>

  <p align="center">
            <p>Back end development of e-commerce product details page, specificlaly the API of the Questions and Answers component.</p>

  </p>
  
## Front-End - App Preview
  
</div>
<div align="center"><br />
  <h3 align="center">Adding a Question</h3>
  <img src="https://media.giphy.com/media/3G48a5Dgv3nqxIi0hA/giphy.gif"/><br />
  
  <h3 align="center">Adding an Answer</h3>
  <img src="https://media.giphy.com/media/N8C4cVrXQnBB6Ca2ej/giphy.gif"/><br />
  
</div>






** FRONT-END - Install**

First install dependencies:

```sh
npm install
```
Create ENV file in ROOT folder (make sure this matches .gitignore name):
```sh
TOKEN=“your Github TOKEN”
API_URL=“https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp”
```

To build the Webpack:

```sh
npm run client-dev
```
To run localhost client:

```sh
npm run server-dev
```

## Running

Open the file `dist/index.html` in your browser

OR

Open `localHost:3000`

**PostreSQL**

PostreSQL database server will need to be installed and running (Version 11 was used for the connection).

CSV files are not uploaded to github and may be provided upon request.

**Dev-Build**

Once PostgreSQL server is running, you may run ``npm run server-dev`` to start the local server which creates a conneciton to the Database for any supported queries.

NGINX rerouting or additional query isntances were not immitated locally for the purpose of the dmo.

** BACK-END - Design**

The backend uses several EC2 Instances on AWS which currently may not be running. Five (5) Instances have been created for this project: \
1. Database Instance to host PostreSQL server \
2-4. Three Query instances to route incoming requests (Copy of Server file in this repo) \
5. NGINX Proxy Instance to route traffic among the 3 server Instances \

## Technologies Used
Setup and Configuration \
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

Front End Development : Javascript, React.js, Axios, HTML, CSS \
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

Back End Development and Database: Node.js, Express.js, PostgreSQL \
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

Deployment, Optimization & Testing: AWS EC2, Ubuntu, PostreSQL Analyze, Loader.io, K6, NGINX, GZIP \
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Postgres](https://img.shields.io/badge/PostreSQL-ANALYZE-blue)
![Loader.io](https://img.shields.io/badge/Loader.io-Cloud--Based%20Testing-blue)
![K6.io](https://img.shields.io/badge/Grafana%20K6-Local%20Testing-purple)
![GZIP](https://img.shields.io/badge/GZIP-Compression-green)


Team Collaboration: \
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
