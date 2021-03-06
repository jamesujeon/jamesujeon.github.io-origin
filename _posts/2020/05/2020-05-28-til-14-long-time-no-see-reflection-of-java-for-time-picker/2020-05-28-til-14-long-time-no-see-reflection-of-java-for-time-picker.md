---
layout: post
title:  "TIL 14: TimePicker 때문에 자바의 Reflection을 쓰게 되다..."
author: "jamesujeon"
categories: [Etc, TIL]
tags: [android, java, ui]
---

## TL;DR

- 기본으로 제공되는 `TimePicker`를 커스텀하기 위해 자바의 `Reflection`을 사용할 수 있다.

## 뭔가 제약이 많은 기본 `TimePicker`

앱 개발을 하다 보면 디자인 요구사항을 위해 뷰를 커스텀 할 일이 많아진다.  
그리고 다채로운 요구사항을 맞추다 보면, 커스텀하는 데 시간을 은근 빼았기곤 한다.

이번에 회사에서 디자인 개선을 진행할 때는 일부 UI에 대해서는 시스템에서 제공하는 기본 UI를 사용하기로 해서 일을 많이 덜었다.
그래도 앱의 컨셉 컬러는 맞춰야 하니깐 기본 UI라도 그 컬러를 맞추고자 했다.

그렇게 작업한 UI 중 하나가 기본 `TimePicker`를 **Spinner 모드**로 포함되어 있는 선의 색깔만 바꾸면 되는 것이었다.
당연히 5분도 안 걸릴 일이라 생각했고, 그것은 착오였다. ☠️

기본 `TimePicker`의 Spinner 모드는 XML을 통한 레이아웃에서만 설정할 수 있었고, 나는 코드를 통한 설정이 필요했다.
굳이 `TimePicker` 하나 때문에 불필요한 레이아웃 파일을 하나 더 늘리기는 싫었고 코드를 통해 설정하고자 했지만,
관련 설정 메소드가 없었고 과거에 사용하던 특정한 Theme를 설정해야 Spinner 모드로 작동하는 것이었다.  
일단, 여기서 한 번 이리저리 헤맸었다.

두 번째로 스타일 설정을 통해 `TimePicker`에 포함되어 있는 선의 색깔을 쉽게 바꿀 수 있는줄 알았다.
이것도 당연히 5분도 안 걸릴 일이라 생각했지만, 그것 또한 착오였다. ☠️

일반적인 방법으로 Sinner 모드인 `TimePicker`의 선(엄밀히 말하면, `TimePicker` 내부의 `NumberPicker`의 선)에 접근하는 것은 불가능했다.
최후의 방법으로 자바의 API 중 하나인 `Reflection`을 쓰게 되었다. 😂

`Reflection`을 쓰면 클래스 내부에 `private`인 멤버들에도 접근할 수 있고, 조작도 가능하다.
그래서 `TimePicker`의 내부 구조를 파악하고, 결국에는 `NumberPicker`의 선의 색깔을 변경할 수 있었다.
웬만하면 쓸 일이 없는 `Reflection`인데 이렇게 사용하니, 내가 까먹지 말라고 쓰게 해주는 것이구나 싶었다.

기본 `TimePicker`의 Spinner 모드도, 그 색깔을 변경하는 것도 자주 쓸만한 기능인데 왜 이렇게 꽁꽁 감싸 놓았는지 답답했었다.
그래도 '다 의도가 있겠지'라는 마음과 결국엔 해결했다는 것에 뿌듯함을 느낀다. 😇