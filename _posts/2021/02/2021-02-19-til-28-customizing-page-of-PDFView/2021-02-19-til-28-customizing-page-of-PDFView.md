---
layout: post
title:  "TIL 28: PDFView의 페이지 커스텀하기"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, ui]
---

## TL;DR

- `PDFView`의 페이지를 커스텀하려면, `PDFViewPageChanged` Notification을 이용하는 것이 좋다.

## `PDFView` 환경설정의 한계

`UIKit`에서 제공하는 `PDFView`를 사용하면, **PDF 뷰어**를 손쉽게 만들 수 있다.  
웬만한 요구사항은 `PDFView`에서 제공하는 환경설정으로 충분히 깔끔하고 편한 PDF 뷰어를 구현할 수 있다.

하지만, 현실은 항상 그렇게 녹록지 않다.  
디자이너의 요구사항에 따라 **PDF 뷰어의 각 PDF 페이지 상하단에 배경과 구분할 수 있는 구분선을 넣어달라는 것**이었다.
디자인 요구사항 자체가 그렇게 어려운 것은 아니라 쉽게 해결될 것 같았지만,
`PDFView`에서 단순하게 제공하는 것만으로는 각 페이지에 구분선을 넣을 수 없었다.

그래서 하루 동안 많은 삽질을 했고, 결국엔 해냈다.  
생각보다 많은 시간(하루 초과)이 들지 않아 다행이었다.

## `PDFView`의 페이지 커스텀하기

구글링도 해보고 [공식 문서](https://developer.apple.com/documentation/pdfkit/pdfview){:target="_blank"}의
이것 저것을 파헤치다가 Notification 중에 `PDFViewPageChanged`가 눈에 들어왔다.

`PDFViewPageChanged`는 말그대로 현재 페이지가 변할 때마다 송신하는 Notification인데,
해당 타이밍 때마다 페이지 뷰에 조작을 가하는 것이 가장 적절한 타이밍이라 생각했다.

또한, 해당 Notification을 이용해 페이지 뷰의 메모리를 확인하면서
페이지 뷰를 새로 생성하거나 재활용하면서 PDF를 보여준다는 것을 파악했다.

그래서 `PDFViewPageChanged` Notification이 수신될 때마다 페이지 뷰를 찾아내 구분선을 추가하도록 다음과 같이 처리했다.

{% highlight swift %}
NotificationCenter.default.addObserver(
    forName: Notification.Name.PDFViewPageChanged,
    object: self,
    queue: nil
) { [weak self] _ in
    guard let scrollView = self?.subviews.first else { return }

    scrollView.subviews.first?.subviews
        .filter { "\(type(of: $0))" == "PDFPageView" }
        .filter { $0.subviews.isEmpty }
        .forEach { pdfPageView in
            var borderView = UIView.build { $0.backgroundColor = CubeColor.border }
            pdfPageView.addSubview(borderView)
            borderView.snp.makeConstraints {
                $0.top.left.right.equalToSuperview()
                $0.height.equalTo(1)
            }

            borderView = UIView.build { $0.backgroundColor = CubeColor.border }
            pdfPageView.addSubview(borderView)
            borderView.snp.makeConstraints {
                $0.bottom.left.right.equalToSuperview()
                $0.height.equalTo(1)
            }
        }
}
{% endhighlight %}

커스텀 `PDFView`를 생성할 때, 위와 같은 동작을 `PDFViewPageChanged` Notification에 등록해주면 된다.
페이지 뷰가 깊숙한 자식으로 들어가 있고, `PDFPageView` 클래스에 접근하지 못하게 되어 있어 **클래스 이름을 이용해 필터링** 했다.
그리고 `filter { $0.subviews.isEmpty }` 처리를 통해 **구분선이 존재하지 않는 경우에만 구분선을 추가**하도록 했다.
그래서 불필요하거나 과하지 않게 적절한 타이밍에 구분선을 페이지에 추가할 수 있었다.

시간이 지날수록 코드로 커스터마이징하는 실력이 늘어나는 것이 체감되어 기쁘다. 😎
