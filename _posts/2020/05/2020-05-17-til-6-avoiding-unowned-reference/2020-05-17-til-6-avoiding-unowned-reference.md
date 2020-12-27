---
layout: post
title:  "TIL 6: unowned 레퍼런스 피하기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, swift]
---

## TL;DR

- `unowned` 레퍼런스는 피하고, 대신 `weak`을 사용하자.

## `unowned` 레퍼런스란? 🤔

Swift로 ARC 환경에서 iOS 앱을 개발할 때, 정말 중요한 개념이 있다.  
바로 `Strong Reference Cycle(강한 참조 순환)`이다.

다른 것도 중요하지만, 이것을 모르고는 iOS 개발자라 할 수 없다.  
그러므로, 다들 알 것이라 생각하고... 개념은 패스!

ARC 환경에서 강한 참조 순환이 생겨 버리면, **메모리에 할당된 대상을 해제할지 말지 판단을 하지 못 한다**.
계속 서로 참조하고 있어, 참조 카운트가 0이 될 수 없기 때문이다.
이를 방지하기 위한 문법으로 `weak`과 `unowned` 참조가 있다.

`weak` 참조는 **약한 참조**라 부르고, `unowned` 참조는 **미소유 참조**라 부를 수 있다.  
두 참조의 가장 중요한 특징은 **참조 카운트를 증가시키지 않는 것**이다.
계속 참조하고 있어도 참조 카운트에 영향을 미치지 않기 때문에,
다른 강한 참조가 사라져 메모리가 해제되는 데 지장이 없다.

또한, `weak` 참조는 참조하는 대상의 메모리가 해제되면 자동으로 `nil`로 설정되지만,
`unowned` 참조는 `nil`로 설정되지 않고 **항상 값이 있다고 가정**해 버린다.
여기서 생명 주기를 잘못 생각해 이미 메모리 해제된 대상을 `unowned` 참조를 통해 접근했을 때,
운이 없다면 앱이 그대로 사망할 수 있다. ☠️

그래서 생명 주기가 확실한 경우에만 `unowned` 참조를 사용할 것을 [Swift 공식 문서][Swift ARC]{:target="_blank"}에서도 강조한다.

> Use an unowned reference only when you are sure that
> the reference always refers to an instance that has not been deallocated.
>
> If you try to access the value of an unowned reference
> after that instance has been deallocated, **you’ll get a runtime error**.

## 안전하게 `weak` 레퍼런스로 통일하자! 👷‍♂️

`unowned` 참조를 언제 사용하면 좋을 지는 [해당 문서][Swift ARC]{:target="_blank"}에 예시와 함께 잘 적혀 있다.
`weak` 참조에 비해 Unwrapping을 하지 않아도 되고, 항상 값이 존재한다는 것을 표현할 수도 있다는 것 등등의 다양한 이점이 있지만,
개인적으로는 사용하지 않는 것이 좋다고 생각한다.

관계를 표현하다가 실수를 할 수도 있고, 요구사항이 바뀌어 수정을 할 때 놓치는 부분이 될 수도 있다.
이런 저런 버그가 생겨 날 가능성이 더 크다고 생각한다.
그런 것들을 감수하면서까지 굳이 `unowned` 참조를 쓸 필요는 없다고 생각한다.
(정말 필요하다는 타당한 이유가 없다면 🙅‍♂️)

단순하고 안전하게 `unowned` 참조를 지양하고, `weak` 참조를 사용하도록 하자.  
개인적으로 `weak` 참조에 `guard` 구문을 사용하면, 왜 이렇게 마음이 편안한지 모르겠다. 😇

[Swift ARC]: https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html
