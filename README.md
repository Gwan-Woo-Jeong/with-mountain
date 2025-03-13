&nbsp;
&nbsp;

<p align="center">
<img src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/logo.jpg?raw=true" alt="logo">
</p>

&nbsp;

## 🌟 프로젝트 소개

**산과함께**는 **등산 모임 커뮤니티**와 **나만의 등산로 제작** 기능을 제공하는 서비스입니다. 산림청에 등록된 등산로 데이터를 기반으로, 사용자가 **자신만의 코스를 자유롭게 구성**할 수 있으며, **잘
알려지지 않은 등산로도 포함**할 수 있어 **새로운 등산 경험**을 제공합니다. 등산로 제작은 사용자가 직접 구간을 선택하여 구성하는 **수동 모드**와 **다익스트라 알고리즘을 활용**해 자동으로 등산로를
추천하는 **추천 모드** 두 가지 방식으로 이루어집니다. 제작된 등산 코스는 **거리와 소요 시간이 자동으로 계산**되어, 보다 **체계적인 등산 계획**을 세울 수 있습니다.

&nbsp;

## 📅 프로젝트 기간

**2024.10.22 ~ 2024.11.11**

&nbsp;

## 💻 개발 환경

| **항목**   | **세부 내용**                                                        |
|----------|------------------------------------------------------------------|
| **운영체제** | Windows 11, Linux(Ubuntu), macOS                                 |
| **서버**   | Apache Tomcat, AWS EC2, Oracle                                   |
| **개발 툴** | STS 3, Visual Studio Code, SQL Developer, IntelliJ IDEA          |
| **협업 툴** | GitHub, Notion, Discord, ERD Cloud, Draw.io, Figma, Google Drive |

&nbsp;

## 🛠️ 기술 스택

| 분류           | 기술 스택                                                                           |
|--------------|---------------------------------------------------------------------------------|
| **프로그래밍 언어** | Java 11, HTML5, CSS, JavaScript (ES6), SQL                                      |
| **프론트엔드**    | Thymeleaf, jQuery, Ajax                                                         |
| **백엔드**      | Spring, Gradle, Spring Web, Spring Security, Lombok, HikariCP, MyBatis, Jackson |
| **데이터베이스**   | Oracle 11g EX                                                                   |

&nbsp;

## 🎉 주요 기능

### 등산로 생성

**수동 모드**

| <img alt="수동 모드" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/manual.gif?raw=true" width="640"> |
|:-------------------------------------------------------------------------------------------------------------------------------:|
|                                                  사용자가 직접 경로를 클릭하여 등산로를 생성합니다.                                                   |

**추천 모드**

| <img alt="추천 모드" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/auto.gif?raw=true" width="640"> |
|:-----------------------------------------------------------------------------------------------------------------------------:|
|                                         다익스트라 알고리즘을 사용하여 기준에 따라 최적의 등산로를 자동으로 생성합니다.                                          |

**캡처 저장**

| <img alt="캡처 저장" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/capture.gif?raw=true" width="640"> |
|:--------------------------------------------------------------------------------------------------------------------------------:|
|                                                     생성한 등산로를 이미지 파일로 저장합니다.                                                      |

### 메인 페이지

**메인 페이지**

| <img alt="메인 페이지" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/main.jpeg?raw=true" height="540" style="object-fit: contain"> |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                                   최근 한 달 동안 좋아요를 많이 받은 인기 산과 커뮤니티 게시글 목록을 확인할 수 있습니다.<br/>또한, 해당 산에서 예정된 등산 모임 일정도 표시됩니다.                                    |

**산 개별페이지**

| <img alt="산 개별페이지" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/moutain.png?raw=true" width="640"> |
|:----------------------------------------------------------------------------------------------------------------------------------:|
|                   특정 산의 일주일간 날씨와 일출 시간을 확인할 수 있습니다. 산에 좋아요를 표시할 수 있으며,<br/>해당 산의 코스 페이지로 이동해 등산로를 직접 만들 수도 있습니다.                   |

### 모임

**모임 메인페이지**

| <img alt="모임 메인페이지" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/group-main.png?raw=true" width="640"> |
|:--------------------------------------------------------------------------------------------------------------------------------------:|
|                        사용자 지역 내 활동 모임을 추천합니다.<br/>모임 가입은 고유한 초대코드를 통해 가능하며,<br/>개별 모임 페이지를 검색하여 직접 가입할 수도 있습니다.                        |

**모임 생성**

| <img alt="모임 생성" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/group-create.png?raw=true" width="640"> |
|:-------------------------------------------------------------------------------------------------------------------------------------:|
|                  모임은 공개 또는 비공개로 설정할 수 있으며,<br/>고유한 초대 코드를 공유해 사용자가 가입할 수 있습니다.<br/>해시태그를 통해 모임의 특징을 한눈에 파악할 수 있습니다.                   |

**등산 기록**

| <img alt="등산 기록" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/hike-record.png?raw=true" width="640"> |
|:------------------------------------------------------------------------------------------------------------------------------------:|
|                                    지난 등산 일정은 모임의 등산 기록으로 저장되며,<br/>등산 코스에 대한 간략한 정보가 요약되어 제공됩니다.                                     |

**멤버 관리**

| <img alt="멤버 관리" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/member-manage.png?raw=true" width="640"> |
|:--------------------------------------------------------------------------------------------------------------------------------------:|
|                                          모임에 가입한 사용자를 확인할 수 있으며,<br/>모임장만 특정 모임원을 추방할 수 있습니다.                                          |

**일정 관리**

| <img alt="일정 관리" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/hike-plan.png?raw=true" width="640"> |
|:----------------------------------------------------------------------------------------------------------------------------------:|
|                                              모임장은 자신이 생성한 코스를 불러와 모임 일정으로 등록할 수 있습니다.                                              |

**사진첩**

| <img alt="사진첩" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/group-gallery.png?raw=true" width="640"> |
|:------------------------------------------------------------------------------------------------------------------------------------:|
|                                                모임원은 등산 사진을 게시하여 다른 모임원들과 공유할 수 있습니다.                                                 |

### 커뮤니티

**사진 게시판**

| <img alt="사진 게시판" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/community-gallery.png?raw=true" width="640"> |
|:-------------------------------------------------------------------------------------------------------------------------------------------:|
|                                  사이트 사용자 간 게시글을 공유할 수 있으며,<br/>게시글은 최신 순, 댓글 많은 순, 좋아요 많은 순으로 정렬할 수 있습니다.                                   |

**상세 게시글**

| <img alt="상세 게시글" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/community-article.png?raw=true" width="640"> |
|:-------------------------------------------------------------------------------------------------------------------------------------------:|
|                          게시글을 클릭하면 상세 내용을 조회할 수 있으며,<br/>내용과 댓글을 등록하거나 확인할 수 있습니다.<br/>작성자는 게시글을 수정하거나 삭제할 수 있습니다.                          |

**자유 게시판·질문 게시판**

| <img alt="자유/질문 게시판" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/community-board.png?raw=true" width="640"> |
|:--------------------------------------------------------------------------------------------------------------------------------------------:|
|                                  게시글은 성격에 따라 사진, 질문, 자유 게시판으로 구분됩니다.<br/>목록에서 작성자, 좋아요 수, 댓글 수를 확인할 수 있습니다.                                  |

**게시글 등록·수정**

| <img alt="게시글 등록/수정" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/article-edit.png?raw=true" width="640"> |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|
|                                               게시글 등록 시 카테고리를 설정하여 원하는 게시판에 게시글을 등록할 수 있습니다.                                               |

### 로그인·회원가입

| <img alt="로그인" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/login.png?raw=true" width="320"> | <img alt="회원가입" src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/sign-in.png?raw=true" width="320"> |
|:----------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------:|
|                                     로그인 방식은 이메일과 OAuth(구글, 카카오, 네이버)<br/>를 통한 가입을 제공합니다.                                     |                                               사용자는 이메일을 직접<br/>입력하여 회원가입할 수 있습니다.                                               |

&nbsp;

## 📁 문서 자료

이미지를 클릭하여 자세히 볼 수 있습니다!

### 요구분석서

<a href="https://docs.google.com/document/d/1J6WUohHpgjGcomN7fNsarP_rBs_5LxUzea9R6FTl95A/edit?usp=sharing">
  <img src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/analysis.png?raw=true" alt="요구분석서" height="540">
</a>

### ERD

<a href="https://www.erdcloud.com/d/4JNwt8YxHbYNZzdBa">
  <img src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/erd.jpeg?raw=true" alt="ERD">
</a>

### 순서도

<a href="https://app.diagrams.net/#G16K254UGcOyDid-bkGwU4p8L1sUBoL0wI">
  <img src="https://github.com/Gwan-Woo-Jeong/with-mountain/blob/main/readme-images/flow-chart.jpeg?raw=true" alt="순서도">
</a>


