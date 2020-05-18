---
layout: post
title:  "TIL 5: Network Activity Indicator가 사라지다"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios]
---

## TL;DR

- 이제 기본 `Network Activity Indicator`를 보여줄 필요가 없다.

<br>

## `Network Activity Indicator`란? 🤔

iOS 앱에서 네트워크 연결이 길어지는 경우, `Network Activity Indicator`라는 연결중 표시를 위한 UI가 있다.  

![Network Activity Indicator](assets/network_activity_indicator.png)
*상태바 좌측에서 확인할 수 있다.*

이것을 본 사람도 있고 아닌 사람도 있을 것이다.
왜냐하면, 화면 모양에 따라 보여지는 경우가 있고 아닌 경우도 있기 때문이다.
또한, 앱 개발자가 이것을 보여지도록 처리했는지에 따라 앱을 사용하는 내내 못 볼 수도 있다.


https://developer.apple.com/design/human-interface-guidelines/ios/controls/progress-indicators/