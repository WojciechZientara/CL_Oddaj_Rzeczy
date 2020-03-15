# Oddaj Rzeczy (Give Things Away) - charity application
A simple web application allowing users to donate things they don't need anymore to various charity organisations. 
<br><br>
## Table of contents
* [Intro](#intro)
* [Screenshots](#screenshots)
* [Technology](#technology)
* [Features](#features)
<br><br>
## Intro
The application is meant to provide an easy solution for people who instead of throwing away things being in good condition which they don't use anymore would like to donate them to trusted charity organisations.<br>
The application consists of two separate layers: the <b>JSP frontend</b> and the <b>REST API</b> backend and has been prepared as the Coders Lab's 'Java Developer: Web' course graduation project.
<br><br>
## Screenshots
![OddajRzeczy01.png](https://github.com/WojciechZientara/Oddaj_Rzeczy/blob/master/OddajRzeczy01.png)
![OddajRzeczy02.png](https://github.com/WojciechZientara/Oddaj_Rzeczy/blob/master/OddajRzeczy02.png)
![OddajRzeczy03.png](https://github.com/WojciechZientara/Oddaj_Rzeczy/blob/master/OddajRzeczy03.png)
![OddajRzeczy04.png](https://github.com/WojciechZientara/Oddaj_Rzeczy/blob/master/OddajRzeczy04.png)
<br><br>
## Technology
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JSON Web Token
* MySQL DB
* Jackson
* Lombok
* Swagger
<br><br>
## Features
#### Not authenticated
* Register new account
* Authenticate (log in)
#### Authenticated user
* Get unread articles
* Get newest article, most popular articles, the article of the week
* Post own articles, edit them and delete
* Solve quizes regarding particular articles
* Get list of existing forums topics
* Look for an interesting topic via the search engine
* Post messages/replies in existing topics, edit and delete one's messages
* Start a new forums topic
#### Authenticated admin
* CRUD operations on articles, quizes and their answers
* CRUD operations on forums topics and messages
* CRUD operations on users and their roles

