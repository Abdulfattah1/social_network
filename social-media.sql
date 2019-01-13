

create table users (
id integer not null auto_increment primary key,
personalImage varchar(200) not null default "unknown",
firstName varchar(50) not null ,
lastName varchar(50) not null ,
email varchar(100) not null unique,
password text not null,
birthday date not null,
gender varchar(6) not null ,
dateOfRegestration timestamp default now()
);

create table posts (
postId integer not null auto_increment primary key ,
textContent text,
imageUrl varchar(300),
pdfUrl varchar(300),
dateOfPosting timestamp default now(),
userId integer not null,
foreign key(userId) references users(id)
);

create table likes (
dateOfPosting timestamp default now(),
userId integer not null ,
postId integer not null ,
foreign key(userId) references users(id),
foreign key(postId) references posts(postId),
primary key(userId,postId)
);


create table comments (
id integer not null auto_increment primary key,
textContent text,
imageUrl varchar(300),
pdfUrl varchar(300),
dateOfPosting timestamp default now(),
userId integer not null ,
postId integer not null ,
foreign key(userId) references users(id),
foreign key(postId) references posts(postId)
)




select *  from users inner join posts on users.id = posts.userId;

select postId , firstName , lastName , personalImage , textContent , dateOfPosting from users 
join posts on users.id = posts.userId join likes on posts.postId = likes.postId
order by dateOfPosting desc;

select * from users;


select * from likes;

delete from likes where userId >=1;

select count(*) numberOfLikes  , posts.postId , users.firstName , users.lastName , users.personalImage ,  posts.dateOfPosting , posts.textContent  from likes  
right join posts on likes.postId = posts.postId 
join users on users.id = posts.userId
group by posts.postId
order by posts.dateOfPosting;


select * from posts left join likes on posts.postId = likes.postId 
join users on users.id = posts.userId
group by posts.postId
order by posts.dateOfPosting











