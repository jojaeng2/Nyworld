# NyWorld :house:
## :bulb: The purpose of a project
  NodeJS, MySQL 학습
  
## :one: Idea
  조금 더 Server Side 프로젝트를 진행해보고 싶었는데, Cyworld가 부활한다는 기사를 보게 되었고, Cyworld를 Clone Coding 해도 재밌을 것 같아 프로젝트를 시작하였다.  
    
  ![KakaoTalk_Photo_2021-04-28-22-20-03](https://user-images.githubusercontent.com/76645095/161983935-da8588bd-8d7c-4a79-8dac-5af7ec1f070d.jpeg)  
    
  필요한 기능들을 손으로 직접 그려보며 설계를 하였다. DB와 관련된 작업도 많이 할 수있을것 같았고, Server 개발을 좀더 많이 해볼 수있을 것 같았다.

##  :two: Technology stack
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Pug-A86454?style=flat&logo=Pug&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/> 
##  :three: Trouble
  :unlock: Number of visitors   
  :key: Cyworld의 핵심 기능은 방문자 수를 표시해주는 기능이다. 같은 사람이 계속 새로고침 한다고 방문자 수가 증가하면 안된다고 판단하였고, 내가 고민한 기능은 아래와 같다.  
  1) 동일한 사람이 reload를 해도 특정 시간이 지나지 않으면, 방문자 수는 증가하지 않는다.
  2) 방문자 수는 매일 초기화 되어야 한다.
  3) Total 방문자 수는 초기화 되지 않는다.  
  
  로그인 기능을 추가하거나, 사용자의 IP를 저장하면 이 기능을 구현할 수있다. 하지만, 좀더 간단한 방법을 떠올리게 되었고 쿠키와 DB를 이용해 이 기능을 구현했으며, 고민했던 과정과 해결 방법을 블로그에 정리했다.  
  https://blog.naver.com/ds4ouj/222329051559  
  
  :unlock: Insert Image into Mysql   
  :key: 아래와 같이 Profile image를 등록하는 기능이 필요했다.  
  ![스크린샷_2021-05-07_오후_4 23 14](https://user-images.githubusercontent.com/76645095/161985178-8d21cc93-5946-472d-bc1d-1bf801a59dfd.png)  
  블로그에 고민 과정과 해결한 방법을 정리하였다.  
  https://blog.naver.com/ds4ouj/222341673978

  :unlock: Insert Youtube Player  
  :key: 단순하게 mp3 file을 저장하기 보다 youtube player를 넣으면 재밌을 것 같았고, 아래와 같은 결과물을 얻게 되었다.  
  ![스크린샷_2021-05-27_오후_11 00 49](https://user-images.githubusercontent.com/76645095/161985656-78a6ac18-42c6-496a-b089-e9738350108d.png)
  youtube player를 web으로 가져오는 방법은 생각보다 어려웠고, youtube의 share 기능은 어떻게 돌아가는지 코드를 하나씩 열어보며 직접 구현에 성공하였다.  
  블로그에 고민 과정과 해결한 방법을 정리하였다.  
  https://blog.naver.com/ds4ouj/222370928901
##  :four: What I learned
  그동안 차곡차곡 공부해온 기술들과 언어를 다양하게 사용해볼 수있었던 프로젝트였다.  
  REST API로 CRUD를 구현했던 방법과 쿠키로 방문자수를 표시하는 방법에 대해 정리한 블로그 포스팅을 보고 도움을 받았다는 여러 사람도 존재해서 누군가에게 도움을 준 첫번째 경험이기도 하다.  
