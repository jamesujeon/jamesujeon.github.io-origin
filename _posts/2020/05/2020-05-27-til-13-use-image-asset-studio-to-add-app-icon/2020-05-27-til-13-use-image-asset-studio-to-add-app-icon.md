---
layout: post
title:  "TIL 13: 안드로이드에서는 Image Asset Studio를 이용해 아이콘을 추가하자"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [android, android-studio]
---

## TL;DR

- 안드로이드에서 아이콘을 추가할 때,
Android Studio의 **Image Asset Studio**를 이용하면 쉽게 **여러 종류의 아이콘(적응형 및 레거시 아이콘 포함)**을 생성할 수 있다.

## 적응형 및 레거시 아이콘 추가를 위한 Image Asset Studio

안드로이드 개발자라면 많은 사람들이 Android Studio를 사용할 것이다.  
Android Studio는 앱 개발을 위한 많은 편리한 기능을 제공한다.

그 중 하나가 앱 개발을 위한 Asset을 손쉽게 추가하고 관리할 수 있도록 지원해준다는 것이다.
특히, 아이콘의 경우, **안드로이드 OS 버전에 따라 사용하는 아이콘 모양이 상이**하기 때문에
직접 파편화에 대응해 Asset을 준비한다면 정말 손이 많이 가는 일이 될 수 밖에 없다.

이번에 회사에서 기존 앱의 전면 디자인 개선 작업을 하면서 앱 아이콘 또한 변경의 대상이었기 때문에 교체가 필요했다.
기존에 존재하던 앱 아이콘은 하나의 이미지로 여러 아이콘을 커버하도록 대충 되어 있었다.
그래서 싹 지우고, Android Studio에서 제공하는 **Image Asset Studio**를 이용해 아이콘을 추가했더니
레거시까지 고려해 아름답게 여러 아이콘이 생성되어 한방에 해결할 수 있었다.

더 궁금한 것이 있다면, [공식 안드로이드 개발자 문서][공식 안드로이드 개발자 문서]{:target="_blank"}에 잘 설명되어 있다.  
Android Studio는 안드로이드 개발자에게 정말 축복같은 IDE인 것 같다. 😇

[공식 안드로이드 개발자 문서]: https://developer.android.com/studio/write/image-asset-studio#access