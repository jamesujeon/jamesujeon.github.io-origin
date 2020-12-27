---
layout: post
title:  "TIL 9: 안드로이드 커스텀 스타일 적용하기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [android, ui]
---

## TL;DR

- **테마에 일반적인 뷰 스타일을 설정**해 앱 전반에 공통적으로 스타일을 적용할 수 있다.

## 스타일 공통화

일반적으로 앱을 개발하면, 공통적으로 적용되는 스타일이 있을 것이다.
예를 들면, 특정 앱에서 사용하는 버튼은 일반적으로 8dp의 cornerRadius를 가지고 회색 배경인 버튼일 수 있다.

그런데 이렇게 자주 쓰이는 공통 버튼을 매번 스타일링 해주기에는 개발자에겐 귀차니즘이 너무 심하다.
실수로 스타일링 구문을 한 줄이라도 빼먹으면, 상이한 디자인의 버튼이 나타날 수 있다.
그래서 **가급적이면 공통 스타일을 정의하고 재활용하는 것이 효율적**일 것이다.

이를 위해 다른 개발 환경에서 공통 스타일을 적용한다면,
일반적으로 서브 클래스를 만들어 해당 클래스에 공통 스타일을 적용해놓고 쓸 것이다.
안드로이드에서도 그 방법이 가능하지만, 더 간단한 방법이 있다.

바로 `style` 요소로 공통 스타일을 정의하고, **기본적으로 적용한 테마에 해당 스타일을 사용하도록 설정**하는 것이다.
예를 들어, 공통 버튼 스타일을 적용하고 싶으면, 테마의 `buttonStyle` 아이템에 정의한 `style` 요소를 설정하면 된다.

{% highlight xml %}
<style name="App.Theme" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="android:buttonStyle">@style/App.Widget.Button</item>
</style>

<style name="App.Widget.Button" parent="@android:style/Widget.Button">
    <item name="android:background">@color/colorPrimary</item>
    <item name="android:textColor">@android:color/white</item>
</style>
{% endhighlight %}

위 코드와 같이 설정하면, `App.Theme` 테마의 버튼은 기본적으로 `App.Widget.Button` 스타일을 갖는다.
따라서, 앱의 기본 테마로 `App.Theme` 테마를 적용하면, 추가적으로 변경하지 않는 한 모든 액티비티가 동일한 버튼 스타일을 갖는 것이다.

이 밖에도 다양한 뷰에 대해 공통 스타일을 적용할 수 있으므로 참으로 편리하다.
물론, 스타일링뿐 아니라 다른 기능도 적용하고 싶으면 서브 클래스로 정의하는 것이 더 나을 수 있다. 🙄