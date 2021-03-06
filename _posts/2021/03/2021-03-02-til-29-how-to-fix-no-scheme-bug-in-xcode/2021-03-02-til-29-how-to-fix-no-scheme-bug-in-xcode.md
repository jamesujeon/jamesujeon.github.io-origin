---
layout: post
title:  "TIL 29: Xcode의 'No Scheme' 버그 해결"
author: "jamesujeon"
categories: [Etc, TIL]
tags: [ios, xcode]
---

## TL;DR

- `<프로젝트>.xcodeproj/xcuserdata/<유저>.xcuserdatad`  
또는 `<프로젝트>.xcodeproj/xcuserdata` 삭제

## Xcode의 'No Scheme' 버그 해결

Xcode를 쓰다보면 자잘한 버그가 발견되곤 하는데, 한창 집중하다가 그런 버그가 발생하면 집중력이 흩트러진다.
이번에도 엄청 집중하며 개발을 하고 있었는데, **'No Scheme' 버그**가 발생해 빌드조차 못하는 상황이 되버렸다.

잘 사용하던 Scheme이 갑자기 모두 사라지며, 'No Scheme'이라 표시되는데 해결책은 매우 간단했다.
**프로젝트 파일 내부의 유저 데이터 관련 디렉터리를 지워 초기화**하는 것이다.

1. `<프로젝트>.xcodeproj/xcuserdata/<유저>.xcuserdatad`  
또는 `<프로젝트>.xcodeproj/xcuserdata` 삭제
2. Xcode 재실행

Xcode 재실행 시, Scheme이 다시 설정되므로 기존과 같이 사용할 수 있다.  
물론, 유저 데이터 중 필요한 파일이 있다면 잘 백업해서 복구하는 절차가 필요하다.

이렇게 Xcode의 자잘한 버그 중 하나로부터 탈출! 😎
