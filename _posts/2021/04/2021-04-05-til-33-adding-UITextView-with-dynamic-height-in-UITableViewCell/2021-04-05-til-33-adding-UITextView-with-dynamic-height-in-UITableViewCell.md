---
layout: post
title:  "TIL 33: 테이블 뷰 셀 안에 동적 높이 텍스트 뷰를 넣는 방법"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, ui]
---

## TL;DR

- 텍스트의 변화에 따라 높이를 갱신하면, 테이블 뷰 셀 안에 동적 높이 텍스트 뷰를 구현할 수 있다.

## 테이블 뷰 셀 안에 자동으로 높이가 늘어나는 텍스트 뷰 넣기

일반적인 구현으로 테이블 뷰 셀 안에 텍스트 뷰를 넣으면, 높이가 고정되어 여러 줄의 텍스트를 입력해도 스크롤이 생길뿐 높이가 달라지지 않는다.
안드로이드의 경우, 간단한 세팅을 통해 iOS의 `UITextView`에 해당하는 `EditText`의 높이가 자동으로 늘어나게 할 수 있지만,
iOS에서는 `Auto Layout`이 생각한 대로 적용되지 않아 골치가 아플 것이다.

그래서 여러가지를 적용해본 결과, **텍스트의 변화에 따라 높이를 계속 갱신하는 방법**이 가장 적절하게 적용되는 것을 확인할 수 있었다.
이 [링크](https://www.damienpontifex.com/posts/self-sizing-uitableviewcell-with-uitextview-in-ios8/){:target="_blank"}를 보면,
`UITextViewDelegate`의 `textViewDidChange(_:)` 메소드를 정의해 높이를 갱신하는 방법을 사용하는 것을 볼 수 있다.

하지만, 해당 링크의 글처럼 그대로 하면 버그가 좀 있어서 나만의 방식으로 변화를 주었다.
다음과 같이 작성하면, 어느 정도 원하는 요구사항대로 동작하는 것을 확인할 수 있었다.

{% highlight swift %}
func textViewDidChange(_ textView: UITextView) {
    guard let tableView = tableView else { return }

    let contentSize = textView.sizeThatFits(CGSize(width: textView.bounds.width, height: .infinity))

    if textView.bounds.height != contentSize.height {
        tableView.contentOffset.y += contentSize.height - textView.bounds.height

        UIView.setAnimationsEnabled(false)
        tableView.beginUpdates()
        tableView.endUpdates()
        UIView.setAnimationsEnabled(true)
    }
}
{% endhighlight %}

참고로 여기서 `tableView`는 일반적으로 `UITableViewCell`에 준비되어 있는 프로퍼티가 아니기 때문에 셀을 구성할 때 주입받거나
다음과 같은 코드로 `tableView`를 찾아내는 코드를 추가하는 것이 편리하다.

{% highlight swift %}
extension UITableViewCell {

    var tableView: UITableView? {
        var view = superview
        while view != nil && !(view is UITableView) {
            view = view?.superview
        }

        return view as? UITableView
    }
}
{% endhighlight %}
