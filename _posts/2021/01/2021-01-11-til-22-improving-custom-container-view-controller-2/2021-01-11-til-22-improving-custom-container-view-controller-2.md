---
layout: post
title:  "TIL 22: 커스텀 컨테이너 뷰 컨트롤러 개선 2"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, ui]
---

## TL;DR

- 커스텀 탭바 컨트롤러를 `UITabBarController`와 유사하도록 구현했다.
- `UITabBarController`와 `UINavigationController`의 자식 뷰 컨트롤러 관리 방식의 차이를 이해해야 한다.

## 탭바 컨트롤러 vs. 네비게이션 컨트롤러

이번에도 역시나 요구사항에 맞추기 위해 커스텀 탭바 컨트롤러를 만들기로 했다.  
[이전](https://jamesu.dev/posts/2021/01/09/til-21-improving-custom-container-view-controller/){:target="_blank"}과 마찬가지로
Root 뷰 생명 주기와 부모-자식 관계 설정의 생명 주기를 신경 쓰며 `UITabBarController`의 리버스 엔지니어링을 시도했다.
헷갈리는 동작도 있었지만, 일부 동작의 경우 커스텀 탭바 컨트롤러와 다를 수 밖에 없기에 인지하고 다른 식으로 구현했다.

`UITabBarController`는 `UINavigationController`와 달리 미리 다수의 자식 뷰 컨트롤러를 추가해 놓는다.
그래서 자식 뷰 컨트롤러 목록을 세팅한 후에는 `addChild`, `removeFromParent` 메소드를 호출할 일이 없었다.

또한, Root 뷰 생명 주기가 `UINavigationController`와는 좀 다른 순서로 호출되었다.
역시나 직접 리버스 엔지니어링을 하길 잘한 것 같다.
예상만으로 구현했다면 뒤늦게 발견해서 고생하며 뒤집었을지도 모른다. 😞

`UITabBarController`와 `UINavigationController`의 차이를 계속 비교하며 커스텀 탭바 컨트롤러를 구현했다.
일단 메뉴가 변동되는 경우는 거의 없기 때문에 가장 필요한 부분에 한해서 구현을 진행했다.
필요하면 그때 계속 개선하면 되지 않을까..?

## 다음은.. 스플릿 뷰 컨트롤러..?

커스텀 컨테이너 뷰 컨트롤러를 하나하나 구현하고 사용해보니 잘 동작할 때 아주 뿌듯하다.
뭔가 일반적인 뷰를 구현한 것과는 달리 좀 더 유용한 것을 만든 기분이 든다.

또 다른 컨테이너 뷰 컨트롤러로 스플릿 뷰 컨트롤러가 있다.
아이패드에서 자주 사용하는 컨트롤러인데, 아직 사내에서는 쓸 일이 없다...
언젠가 커스텀 스플릿 뷰 컨트롤러를 만들 기회도 생기지 않을까?

그 밖에도 자식 뷰 컨트롤러를 담는 것이라면, 모두 컨테이너 뷰 컨트롤러가 될 수 있다.
이번에 좀 더 공부해서 **커스텀 컨테이너 뷰 컨트롤러**를 구현하기 위한 분석을 많이 해보고 글로 정리해 봐야겠다. 🔥
