---
layout: post
title:  "TIL 21: 커스텀 컨테이너 뷰 컨트롤러 개선"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, ui]
---

## TL;DR

- 기존 커스텀 네비게이션 컨트롤러가 `UINavigationController`와 유사하도록 개선을 진행했다.
- 아직 만족스럽지 않아 개선이 더 필요하다.

## 기존 커스텀 네비게이션 컨트롤러의 문제점

요구사항에 따라 개발을 하다 보면, `UIKit`에서 제공하는 컨테이너 뷰 컨트롤러만으로는 만족스럽게 결과물이 나오지 않는 경우가 있다.
또한, UI나 애니메이션 등을 완전히 커스텀하고 싶을 때도 기존 라이브러리로는 한계가 있을 수 있다.
**결국에는 직접 커스텀 컨테이너 뷰 컨트롤러를 만드는 것이 오히려 마음이 편하다**.

그렇게 해서 직접 만들어서 사용하던 커스텀 네비게이션 컨트롤러가 있었는데,
현재 사용하는 데는 문제점이 없었지만 미래에 발생할 수 있는 문제점이 존재했다.
그것은 바로 **`UINavigationController`와 동작이 완전히 일치하지 않는다는 점**이다.

물론, 현재 사용하는 것에 문제점이 없었다는 말은 특정 동작만 사용했기 때문인데,
이것은 추후 유지보수를 진행할 때 찾기 어려운 버그가 생길 수 있다.
그렇게 개선의 필요성을 느끼게 됐고, 커스텀 컨테이너 뷰 컨트롤러를 위한 분석을 진행했다.

## 개선 방향

기존에 반영한 생명 주기는 많이 사용하고 있는 뷰 컨트롤러의 기본적인 Root 뷰 생명 주기이다.

- `viewDidLoad`
- `viewWillAppear`
- `viewDidAppear`
- `viewWillDisappear`
- `viewDidDisappear`

해당 메소드들을 자식 뷰 컨트롤러가 추가 또는 제거되는 시점에 따라 호출하도록 구현했었다.

하지만, 실제로 `UIKit`에서 제공하는 네비게이션 컨트롤러와 호출되는 순서가 일치하지 않았기에 동일한 순서가 되도록 수정을 진행했다.
애니메이션이 포함되어 있는 경우 시점을 잘 지정해 구현해야 했다.
시점이 어긋나면, 자식 뷰 컨트롤러의 생명 주기를 구현할 때 예상치 못한 순서로 동작할 수 있다.

그리고 뷰 컨트롤러는 기본적으로 부모-자식 관계를 설정해서 활용할 수 있는 `parent`, `children` 프로퍼티가 존재했는데,
나는 별도로 부모를 나타내는 프로퍼티와 `viewControllers` 프로퍼티를 정의해 사용하고 있었다.
이것을 `addChild`, `removeFromParent` 메소드를 호출해 `parent`, `children` 프로퍼티를 활용하도록 수정했다.

또한, Root 뷰 생명 주기와 부모-자식 관계 설정의 생명 주기를 `UINavigationController`와 맞추기 위한 작업을 추가로 진행했다.
아무래도 iOS 개발자는 기본으로 제공하는 생명 주기에 익숙할 터이니 그것의 생명 주기에 맞추는 게 적합하다고 생각했다.

마지막으로 Apple Developer 문서에서
[뷰 생명 주기 메소드를 직접 호출하지 말라](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621387-beginappearancetransition){:target="_blank"}고 하고 있어,
해당 메소드들을 `beginAppearanceTransition`와 `endAppearanceTransition`를 호출하도록 수정했다.

아직 커스텀 컨테이너 뷰 컨트롤러에 대한 분석이 다 된 것 같지 않아 만족스럽지 않다.  
더 분석해보고 적용한 뒤 글을 정리해 포스팅 해봐야겠다. 🕵🏻
