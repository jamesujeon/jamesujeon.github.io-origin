---
layout: post
title:  "Linux 부팅 시, 서비스 자동으로 시작하기"
author: "jamesujeon"
categories: [Infra, OS]
tags: [linux, command]
---

## 개요

[이전 글][이전 글]{:target="_blank"}에서 Docker 컨테이너를 자동으로 시작하는 법을 알았다.  
그렇다면, 서버가 죽었을 때 Docker가 시작되어야 Docker 컨테이너 또한 재시작을 할 수 있지 않을까?

이 글에서는 Docker를 자주 사용하는 OS인 Linux 상에서 서비스를 자동으로 시작하는 법을 알아보도록 한다.  
모두 적용한다면, 서버가 재시작됐을 때, Docker 서비스도 재시작되고, Docker 컨테이너도 재시작될 것이다.

## Linux 배포판별, 버전별 차이

이미 알고 있는 것처럼 Linux는 Linux Kernel을 기반으로 다양한 배포판이 존재한다.  
그런 배포판들은 제작자의 입맛에 맞춰 만들어진 것이므로 **배포판별로 명령어가 상이할 수 있다**.  
또한, 각 배포판은 버전이 오름에 따라 변화를 하면서 명렁어가 바뀌기도 한다.

이처럼 배포판별, 버전별로 명렁어 차이가 존재할 수 있기 때문에 현재 사용하는 것에 맞춰 알아보고 사용해야 한다.  
여기서는 자주 사용하는 명령어를 바탕으로 설명하며, 동일한 명령어가 존재하지 않을 수도 있으니 유의하길 바란다.

한 쪽에 있는 명령어를 사용하는 배포판에서는 동일한 명령어들을 사용하므로, 같은 쪽의 명령어를 사용하면 된다.

## 서비스 관리 명령어

`service` vs `systemctl`

- 서비스 상태 확인 : `service 서비스명 status` 또는 `systemctl status 서비스명`
- 서비스 시작 : `service 서비스명 start` 또는 `systemctl start 서비스명`
- 서비스 정지 : `service 서비스명 stop` 또는 `systemctl stop 서비스명`
- 서비스 재시작 : `service 서비스명 restart` 또는 `systemctl restart 서비스명`

## 서비스 자동 시작 명령어

`chkconfig` vs `systemctl`

- 자동 시작 확인 : `chkconfig 서비스명 --list` 또는 `systemctl is-enabled 서비스명`
- 자동 시작 설정 : `chkconfig 서비스명 on` 또는 `systemctl enable 서비스명`
- 자동 시작 해제 : `chkconfig 서비스명 off` 또는 `systemctl disable 서비스명`

[이전 글]: https://jamesu.dev/posts/2019/12/19/starting-container-automatically/
