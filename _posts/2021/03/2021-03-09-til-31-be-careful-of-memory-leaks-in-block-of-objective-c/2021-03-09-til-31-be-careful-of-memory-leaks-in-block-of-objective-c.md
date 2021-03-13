---
layout: post
title:  "TIL 31: Objective-C의 Block 사용 시 메모리 누수 주의!"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, objective-c]
---

## TL;DR

- `Block` 내부에서 외부 요소를 접근할 때는 `__weak` 키워드의 지역 변수에 외부 요소를 대입하고 사용하자.
- `__weak` 키워드를 사용한 변수는 **약한 참조**이기 때문에 언제든 `nil`일 가능성이 있다는 것에 주의하자.

## Block 프로그래밍

Objective-C는 Swift의 Closure가 등장하기 이전에 `Block`이란 것을 지원했다.
Closure와 유사하게 **로직을 보관할 수 있는 함수 자료형**이라 생각하면 된다.
그래서 유사한 특징을 가지기도 하는데, 그 중 하나가
**`Block` 내부에서 외부의 요소를 접근할 시에 강한 참조를 가진다는 점**이다.

이는 Closure에서도 `self`를 직접 사용함으로써 발생할 수 있는 점하고 유사하다.
Closure에서는 `Capture List`를 사용해서 약한 참조로 캡처해 사용할 수 있다.

그렇다면, `Block`에서는 어떻게 약한 참조로 사용할 수 있을까?

## 메모리 누수 해결

사내 프로젝트 유지보수 중에 숨겨져 있는 버그 하나를 발견했다.  
정상적으로 메모리 해제가 된다면, 자연스럽게 `dealloc` 메소드가 호출되면서 특정 로직이 수행되어야 했는데
그렇지 못해서 비정상적인 동작을 하고 있었다.
이 버그가 특정 상황에서만 발생했기 때문에 더욱 발견하기 어려웠다.

결론은 특정 비즈니스 로직에서 `Block`을 사용하는데, 그 내부에서 `self`를 자연스럽게 접근하고 있는 것이었다.
그로 인해 `Block`이 `self`에 대한 강한 참조를 가지고, 메모리에 **좀비**로 남아 있어 메모리 해제가 되지 못한 것이다.

해결책은 **`Block`을 정의하기 전에 내부에서 사용할 값을 `__weak` 키워드로 지역 변수에 보관하고 그것을 사용하는 것**이다.
예를 들어, `self`를 직접 사용해야 한다면 `__weak` 키워드를 통해 `weakSelf`와 같은 변수에 대입해 놓고 `weakSelf`를 쓰는 것이다.
물론 **`Block` 내부에서 `weakSelf` 사용 시, `nil`일 수 있다는 것에 주의해야 한다**.

그래서 `Block`을 사용하고 있는 코드를 전부 확인해서 기존에 숨겨져 있던 잠재적 버그까지 모두 수정했다.
더 이상 메모리 누수로 골머리를 앓지 않기 위해서...

예전에는 Objective-C를 사용할 기회가 많이 없었는데,
여기서는 사내 프로젝트 중 일부가 그 언어로 되어 있어 유지보수를 통해 이런저런 일을 많이 겪을 수 있다.
점점 더 Objective-C와 친해지고 있는 것 같다.

하지만 나는 Swift와 더 친하게 지낼 것이다. 🙄

참고로 `Block`에 대해 더 알고 싶다면, 이 [링크][Blocks Programming Topics]{:target="_blank"}를 참고하면 된다.

[Blocks Programming Topics]: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Blocks/Articles/00_Introduction.html#//apple_ref/doc/uid/TP40007502
