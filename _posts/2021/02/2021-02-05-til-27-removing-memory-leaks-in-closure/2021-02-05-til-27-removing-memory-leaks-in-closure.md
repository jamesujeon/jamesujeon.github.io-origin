---
layout: post
title:  "TIL 27: Closure에서의 메모리 누수 제거하기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, swift]
---

## TL;DR

- Retain Cycle이 아닌 **불필요한 메모리 점유**도 일종의 메모리 누수라고 생각한다.
- Closure에서 `weak` 캡처를 할 때는 타이밍에 주의하자.
- **기본기**는 항상 중요하다.

## 숨겨져 있는 메모리 누수

Xcode는 현재 화면에서의 메모리 누수를 확인할 수 있는 `Debug Memory Graph` 기능을 제공한다.
이를 통해 메모리에 할당된 데이터 간의 그래프를 볼 수 있고, 그 관계를 통해 누가 누구와 연결되었는지 알 수 있다.
그리고 Retain Cycle이 발생한 경우, 바로 표시해주어 한눈에 그것을 알 수 있다.

하지만, Retain Cycle 표시가 없다고 안심할 수 있는 것은 아니다.  
실제 메모리가 할당된 목록을 보면, 현재 화면에서 존재하면 안 되는 데이터가 남아있는 것이 확인될 수도 있다.
논리적으로 해당 데이터가 남아 있으면 안 되지만 목록에 나타난다면,
**그것은 Retain Cycle은 아니지만 앱이 실행되는 내내 메모리를 점유하고 있기에 불필요한 메모리 점유로 간주한다**.
그래서 나는 이것도 또 하나의 메모리 누수라고 생각한다.

## Closure 사용할 때 주의하기

사내 프로젝트에서도 그 숨겨진 메모리 누수가 발견되었는데, 원인을 찾기 매우 어려웠다.
그래도 Xcode의 `Debug Memory Graph` 기능을 통해 연결 관계를 추적하다보니 Closure를 사용하는 부분이 의심이 됐다.
그리고 몇가지 실험을 통해 Closure에서 객체를 붙잡고 있어 메모리 누수가 발생한 것을 알 수 있었다.

개인적으로 Swift에서 Closure를 사용할 때 `self`의 프로퍼티나 메소드를 사용하는 경우, 항상 `weak` 캡처를 하는 습관이 몸에 배어 있다.
그래서 별 탈이 없이 사용한 줄 알았는데 함정이 있었다.

기존 코드는 다음과 같이 `weak self` 캡처를 했었다.  
(개인적으로 사용한 코드이기 때문에 Closure 부분만 집중하면 된다.)

{% highlight swift %}
$0.addAction(for: .valueChanged) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) { [weak self] in
        self?.refreshData()
    }
}
{% endhighlight %}

하지만, 나는 `Capture List`라는 개념에 대해 대략적으로만 알고 사용했었고, 그 결과 메모리 누수로 이어졌던 것이다.
저렇게 캡처를 하면, `addAction` 메소드를 호출해 Closure를 정의하는 시점에는 `self`가 `weak` 캡처되지 않고,
그 안의 `asyncAfter` 메소드를 호출할 때 `weak self` 캡처를 위해 `self`가 사용되기 때문에 결국에는 `strong` 캡처가 된 것이다.

`Capture List`는 Closure를 **정의하는 시점에 캡처**를 하는 것이기 때문에 `weak` 캡처를 하고 싶다면, 정의 시점에 캡처를 해야 한다.
따라서, 다음과 같이 수정을 하면 Closure에서 `self`를 붙잡는 현상이 사라진다.

{% highlight swift %}
$0.addAction(for: .valueChanged) { [weak self] in
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.25) {
        self?.refreshData()
    }
}
{% endhighlight %}

정말 간단한 해결책이지만, Swift 언어에 대한 기본기가 부족해 발생했던 문제점이었다.

이렇게 고생을 했으니 앞으로는 까먹지 않고 숨겨진 메모리 누수를 막을 수 있을 것 같다.  
다시 한번 느끼지만, **기본기**는 항상 중요하다. 🤔
