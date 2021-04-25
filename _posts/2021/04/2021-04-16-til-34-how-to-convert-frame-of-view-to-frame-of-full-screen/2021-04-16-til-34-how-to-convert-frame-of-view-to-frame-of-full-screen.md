---
layout: post
title:  "TIL 34: 전체 화면 기준으로 현재 뷰의 프레임 얻기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, ui]
---

## TL;DR

- 부모 뷰의 `convert(_:to:)` 메소드에 현재 뷰의 프레임과 키 윈도우의 Root 뷰를 전달하면,
전체 화면 기준으로 현재 뷰의 프레임을 얻을 수 있다.

## 두 뷰를 동일한 기준으로 프레임 변환하기

현재 회사에서 사내 프로젝트를 진행할 때, 코드 기반 UI 구성이 기본이다 보니
가끔 서로 다른 뷰 사이의 프레임 비교가 불가피할 때가 있다.
이때, 서로 다른 뷰의 관계가 가깝다면 프레임 변환을 쉽게 할 수 있지만,
서로 다른 부모를 가지고 있다면 머리가 복잡해질 수 있다.

두 뷰가 겹치는 것을 확인하고 싶다면, 동일한 기준을 바탕으로 비교를 하면 될 것이다.
그래서 전체 화면을 기준으로 각 뷰의 프레임을 얻는다면 간단하게 두 뷰 사이의 프레임을 비교할 수 있을 것이다.

다음과 같은 코드를 사용하면, 전체 화면 기준으로 해당 뷰의 프레임을 얻을 수 있다.
물론, Nullable 하기 때문에 사용할 때 `nil` 체크는 필수이다.

{% highlight swift %}
let keyWindow = UIApplication.shared.windows.first { $0.isKeyWindow }
let convertedFrame = view.superview?.convert(view.frame, to: keyWindow?.rootViewController?.view)
{% endhighlight %}

용도에 따라 좌표만 필요한 경우, 좌표만 변환할 수 있는 것도 존재하므로 그것을 이용하면 된다.
