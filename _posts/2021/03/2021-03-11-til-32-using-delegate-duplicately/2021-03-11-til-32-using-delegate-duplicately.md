---
layout: post
title:  "TIL 32: 중복으로 Delegate 사용하기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, swift, objective-c]
---

## TL;DR

- 내부 로직은 스스로(`self`)를 부모의 `delegate` 프로퍼티에 할당한다.
- 외부 로직은 프록시와 포워딩을 통해 이벤트와 연동되도록 한다.

## 일반적인 방법으로 Delegate를 사용할 때의 문제점

커스텀 클래스를 정의하다보면, 내부 로직을 정의하고 스스로(`self`)를 `delegate` 프로퍼티에 대입해 사용할 때가 있다.
`UIKit`에서 제공하는 방법이 Delegate를 이용하게끔 강제하는 경우가 있기 때문이다.

예를 들어, 커스텀 `UITextField` 클래스를 정의할 때 텍스트 입력을 계속 추적하면서
경우에 따라 입력 방지를 처리하고 싶을 때 Notification으로 처리를 할 수 없고,
`UITextFieldDelegate`를 구현해 `delegate` 프로퍼티에 대입해야 한다.

`delegate` 프로퍼티는 하나의 구현체만 가리킬 수 있기 때문에,
해당 클래스의 `UITextFieldDelegate`를 외부에서 구현해 `delegate` 프로퍼티에 대입하게 되면
기존에 스스로(`self`)를 대입했던 `delegate`는 덮어씌워지기 때문에 내부에서 정의한 로직은 동작하지 않게 된다.

커스텀 `UITextField` 클래스를 정의하면서 의도했던 내부 로직은 더 이상 동작하지 않기 때문에 원하던 방식은 아닐 것이다.
그렇다면, **내부 로직도 수행되면서 적절하게 외부 로직도 수행되게 하는 방법은 없을까**?

## Delegate 포워딩하기

구글링을 열심히 하다보니 [원하던 답][스택오버플로우 답변]{:target="_blank"}을 찾게 되었다.  
내부 로직은 원래대로 **스스로(`self`)를 부모의 `delegate` 프로퍼티에 할당**하고,
외부 로직은 **프록시와 포워딩**을 통해 추가적으로 수행하게 만들 수 있다.

위 답변을 보면, 다음과 같이 커스텀 클래스의 `delegate` 프로퍼티가 프록시 역할을 하도록 정의한 것을 볼 수 있다.

{% highlight swift %}
private var realDelegate: UITextFieldDelegate?

// Keep track of the text field's real delegate
override var delegate: UITextFieldDelegate? {
    get {
        return realDelegate
    }
    set {
        realDelegate = newValue
    }
}
{% endhighlight %}

외부에서 `delegate`에 접근할 때는 부모의 `delegate`가 아닌 내부 전용 프로퍼티인 `realDelegate`에 접근하게 된다.
이러고 생성자에서는 `super.delegate = self`와 같은 코드를 통해 부모의 `delegate`에는 `self`만 접근하도록 할 수 있다.

그리고 다음과 같이 포워딩을 함으로써 특정 이벤트가 발생했을 때 외부에서만 정의한 로직이 있는 경우 수행할 수 있도록 해준다.

{% highlight swift %}
override func forwardingTarget(for aSelector: Selector!) -> Any? {
    if let realDelegate = realDelegate, realDelegate.responds(to: aSelector) {
        return realDelegate
    } else {
        return super.forwardingTarget(for: aSelector)
    }
}

override func responds(to aSelector: Selector!) -> Bool {
    if let realDelegate = realDelegate, realDelegate.responds(to: aSelector) {
        return true
    } else {
        return super.responds(to: aSelector)
    }
}
{% endhighlight %}

특정 이벤트에 대해 내부 로직을 수행하면서 추가적으로 외부 로직이 호출되기 원한다면,
`realDelegate`를 통해 외부 로직도 호출해줘야 한다.

{% highlight swift %}
// This only allows numbers to be typed into the text field.
// Of course this can be changed to do whatever validation you need in this custom text field
func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    if string.rangeOfCharacter(from: CharacterSet.decimalDigits.inverted) != nil {
        return false // Not a number - fail
    } else {
        // The string is valid, now let the real delegate decide
        if let delegate = realDelegate, delegate.responds(to: #selector(textField(_:shouldChangeCharactersIn:replacementString:))) {
            return delegate.textField!(textField, shouldChangeCharactersIn: range, replacementString: string)
        } else {
            return true
        }
    }
}
{% endhighlight %}

위와 같은 방식은 Objective-C에서도 문법만 달라지고 로직은 동일하게 적용할 수 있다.

커스텀 UI를 만들면 만들수록 새로 알아가는 개념들이 많아지고 있어 재밌고 뿌듯한 기분이 든다. 🤓

[스택오버플로우 답변]: https://stackoverflow.com/questions/43679859/shouldchangetext-not-called-for-uitextfield-when-using-hardware-keyboard
