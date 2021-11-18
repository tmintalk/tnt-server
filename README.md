# tnt-server

CS473 Introduction to Social Computing team TnT Design Project : [Website](http://tmintalk.com)
## Getting Started
1. Request `.env` file to Admin
2. Install [Node.js](https://nodejs.org/en/) \(npm\)

```
$ npm install
$ npm start
```

## Implementation
### Post
date, item, price, about, description, imageUrl로 이루어진 Table을 생성한 후 로그인 상태에서 파라미터를 body에 담아 POST 요청을 보내면 게시물이 생성된다. 또한, 피드에 게시물을 보여주기 위해 게시물 리스트를 전달해준다.

- GET `/posts`
- POST `/posts`

### Question & Answer
서비스에서 조금 더 서비스에 쉽게 게시물을 올릴 수 있도록 질문을 제공하고 이를 답변할 수 있게 한다. 서비스에서 질문을 제공하고 로그인 상태에서 답변을 하면 해당 유저와 연결되게 된다.

- GET `/questions`
- POST `/`
- POST `/answer/:questionId`

### Like
상대 유저 게시물에 좋아요 반응을 보내준다. Post table의 relation 되어있는 like table에 데이터를 생성해서 저장하고 좋아요를 취소할 시 데이터를 삭제하도록 구현했다.

- POST `/likes/:postId`
- DELETE `/likes/:postId`

### Chatting
상대방의 게시물을 본 후 직접적인 interaction이 일어날 수 있도록 채팅 기능을 구현했다. socket을 사용하여 채팅방 생성 및 채팅방 확인, 채팅 전송을 구현했다.

- GET `/chat/allMessages`
- GET `/chat/:roomId/users`
- GET `/chat/:roomId/messages`
- GEt `/chat/:name/readCnt`

### Image Upload
프로필 사진과 게시물 사진에 이미지가 필요하므로 AWS의 S3 이미지 클라우드에 이미지를 저장 할 수 있도록 API를 제작하였다. 이미지를 받아서 저장한 후 uri를 돌려준다.

- POST `/uploads`
- POST `/uploads/post`

### Join & Login
비밀번호는 hash하여 저장하였고 가입 및 로그인 이후에는 JWT token을 사용하여 로그인 상태에서 API를 사용해야 할 경우 로그인 여부를 확인할 수 있도록 구현하였다.

- GET `/auth/me`
- POST `/auth/join`
- POST `/auth/login`

## Directory

```text
tnt-server
├── front
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models        // db schema
│   ├── routes        // routing
│   └── index.js      // entry point
├── .env              // hidden environment variables
├── .gitignore
├── package.json
└── README.md
```

## Contributors

* [**Jiseung**](https://github.com/micko6420)
* [**Seungho**](https://github.com/TheStarkor)
* [**Taewoo**](https://github.com/T-dubb)
* [**Yumi**](https://github.com/woomoo00)