---
layout: post
title:  "TIL 19: Simple-Jekyll-Search 오픈 소스 기여"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [oss, jekyll, javascript]
---

## TL;DR

- 이 블로그에 검색 기능을 넣고 싶어서
[Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search){:target="_blank"}
라이브러리를 적용하려 했다.
- 버그를 발견해 수정해서 Simple-Jekyll-Search 라이브러리에
[PR](https://github.com/christian-fei/Simple-Jekyll-Search/pull/162){:target="_blank"}을 보냈다.
- Merge되면 좋겠다.
- 오픈 소스 분석은 은근 재밌다.

## 버그 발견, 수정 도전, 그리고 PR

이 블로그를 만들고 사용하면서 가장 큰 문제 중 하나는 원하는 글을 검색할 수 없다는 것이었다.  
그래서 검색 기능을 넣고자 알아보던 중에
[Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search){:target="_blank"}를
알게 되었고, 그것이 내가 원하는 검색 기능에 어느 정도 부합하다는 생각이 들어 적용 하기로 마음 먹었다.  
그리고 이 라이브러리의 예제 수준으로만 검색 기능을 적용하기에는 원하는 퀄리티가 나오지 않아 커스터마이징 작업도 진행하기로 했다.

그렇게 작업을 진행하던 중에 `exclude` 옵션을 적용해보다가 전혀 작동하지 않는 현상을 발견했다.  
그것을 보고 갑자기 삘(?)을 받아 처음에는 의도치 않았지만, 해당 라이브러리의 소스를 분석하기 시작했다.

해당 소스의 주 언어는 JavaScript였고, 많이 사용해 본 경험이 없어 낯설었지만 재밌겠다는 생각에 분석을 진행했다.  
검색해가며 소스 분석을 하다 보니 아주 치명적인 버그를 발견할 수 있었다.  
검색 기능 관련 객체를 생성하는 코드에서 전달한 `exclude` 옵션을 세팅하지 않는 것이었다.

다행히 소스의 덩치가 크지 않아 분석하는 것이 크게 어렵지 않았고,
버그를 수정해서 Simple-Jekyll-Search 라이브러리에
[Pull Request(PR)](https://github.com/christian-fei/Simple-Jekyll-Search/pull/162){:target="_blank"}을 보냈다.  
최근까지도 Merge된 흔적이 있는 것을 보니 활동하고 있는 프로젝트라 생각이 들었다.  
부디 나의 PR을 받아 들여 Merge되면 좋을 것 같다. 🥺

## 오픈 소스 기여

Open Source Software(이하 OSS)에 기여하는 것은 항상 어려운 일이라고만 생각이 들었는데, 생각보다 쉬운 일이었다.
물론, 시작은 쉽지만 Merge 되는 것은 어려울 수 있다.  
시작이 반이라는 말처럼 일단 시작하는 것에 큰 의의를 두려고 한다.

또한, 나와 다른 사고와 스타일을 가진 개발자의 코드를 보니 신기하고 재밌었다.  
내 코드도 GitHub을 통해 공개되기도 하니 코드 퀄리티에 더 신경 써야겠다는 생각이 재차 들었다.

OSS들을 보다 보면 생각보다 작은 덩치도 많고, 그런 프로젝트는 진입 장벽도 높지 않으니 자주 시도해보는 것이 좋을 것 같다.
이것이 쌓이면, 큰 프로젝트에 기여하는 것도 불가능한 일은 아닐 것 같다.  
기여한 OSS가 많아지면 그 뿌듯함도 점점 쌓여가지 않을까? 🙂

## 2020.12.27 내용 추가

해당 [PR](https://github.com/christian-fei/Simple-Jekyll-Search/pull/162){:target="_blank"}의
Merge가 받아들여졌다!  
매우 뿌듯하고, 해당 프로젝트를 더 발전시키고 싶은 욕심이 생긴다.  
불편했던 기능이 하나 있는데... 그것도 바꿔볼까? 🔥
