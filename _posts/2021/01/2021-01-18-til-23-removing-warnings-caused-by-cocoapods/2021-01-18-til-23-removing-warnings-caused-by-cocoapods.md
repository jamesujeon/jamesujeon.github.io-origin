---
layout: post
title:  "TIL 23: CocoaPods로 인한 Warning 제거"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, xcode]
---

## TL;DR

- CocoaPods로 외부 라이브러리 설치 후 생기는 Warning은 `post_install` 훅으로 쉽게 제거할 수 있다.

## 신경 쓰이는 Warning 제거하기

개인적으로 Xcode에 노란색 Warning이 보이면 굉장히 거슬려서 가능하면 모두 제거하려고 하는 편이다.
어떤 종류의 Warning이라도 검색을 통해 기필코 제거하려 한다.
Warning이 치명적인 버그를 낳을 수도 있지만, 뭔가 잘못 코딩한 것 같은 느낌을 들게 하기 때문이다.

사내에서 외부 라이브러리 연동으로 CocoaPods를 주로 사용하는데,
언제부턴가 `pod install`로 외부 라이브러리를 설치하고 난 후에 Xcode에 몇몇 Warning이 뜨기 시작했다.

치명적인 Warning은 아니기 때문에 Xcode에서 제공하는 설정 값 갱신 기능을 사용하면 쉽게 제거할 수 있다.
하지만, 다른 개발자가 프로젝트를 이어 받아 진행할 수도 있고, 외부 라이브러리 설치 시마다 거슬릴 수 있으므로
설정 값 갱신조차 필요하지 않도록 하고 싶었다.

## `post_install` Hook

CocoaPods에는 `post_install`
[훅](https://guides.cocoapods.org/syntax/podfile.html#post_install){:target="_blank"}이 존재하는데,
이를 이용하면 **`pod` 설치 후 수행할 처리**를 정의할 수 있다.
앞서 발생한 Warning은 외부 라이브러리에 특정 설정 값이 적절하지 않게 세팅되어 발생한 것으로 해당 값을
`pod` 설치 후 적절하게 세팅하도록 처리하면 된다.

다음과 같은 훅을 추가해 설치된 외부 라이브러리의 `CLANG_ANALYZER_LOCALIZABILITY_NONLOCALIZED`와
`CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER` 값이 적절하게 세팅되도록 했다.

{% highlight ruby %}
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings['CLANG_ANALYZER_LOCALIZABILITY_NONLOCALIZED'] = 'YES'
    config.build_settings['CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER'] = 'NO'
  end
end
{% endhighlight %}

노란색 Warning들이 깔끔하게 사라진 것을 보고 아주 만족했다. 🙂
