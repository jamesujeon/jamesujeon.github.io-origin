---
layout: post
title:  "Docker 컨테이너 자동으로 시작하기"
author: "jamesujeon"
categories: [Infra, Virtualization]
tags: [docker, container]
---

## TL;DR

- `docker run` 실행 시, 재시작 옵션(`--restart`)을 추가한다.  
(예: `docker run -d --restart always --name test centos tail -f /dev/null`)

- Docker를 조건으로 걸어둔 **서비스 파일**을 작성한다.  
(OS별로 작성법이 상이할 수 있고, 서비스 파일의 존재를 인지하지 못할 수도 있기 때문에 권장하지 않는다.)

## 개요

Docker가 재시작되지 않고 항상 켜져있을 수 있다면, 컨테이너를 재시작할 필요는 없을 것이다.  
하지만, Docker를 구동하고 있는 서버가 불의의 사고 또는 고의의 사고로 갑작스럽게 종료될 수 있는 가능성은 존재한다.  
따라서, 서버가 재시작될 때 Docker도 재시작되고, 기존에 Docker가 유지하던 컨테이너 또한 재시작되도록 해야 한다.

Docker를 재시작하는 방법은 [다음 글][다음 글]{:target="_blank"}로 미루고, 여기서는 Docker 컨테이너를 재시작하는 방법을 다룬다.

## 기본적인 `docker run`

Docker에서 특정 옵션 없이 기본 명령어인 `run`으로 컨테이너를 구동한 경우, Docker가 재시작한다면 컨테이너는 자동으로 시작되지 않는다.

다음과 같이, 재시작 관련 옵션 없이 컨테이너가 종료되지 않도록 구동시키고, Docker를 재시작한다.  
(이미지는 Public Repository로부터 `centos`를 `docker pull centos`로 받아 사용한다.)  
(Docker 재시작 명령어는 OS 별로 상이할 수 있다.)

{% highlight text %}
docker run -d --name test centos tail -f /dev/null
docker ps -a
service docker restart
docker ps -a
{% endhighlight %}

마지막 `docker ps -a` 명령어를 통해 `test` 컨테이너가 종료 상태인 것을 확인할 수 있다.

이는 재시작 옵션(`--restart`)에 기본값으로 `no`가 들어가기 때문이다.  
말그대로 재시작을 하지 않겠다는 뜻이다.

## 재시작 옵션과 함께

재시작 옵션(`--restart`)으로 `no`가 아닌 옵션을 주면, Docker가 갑작스럽게 종료되었다가 다시 시작할 때, 컨테이너 또한 재시작하게 된다.
재시작되는 조건은 옵션에 따라 동작이 상이할 수 있다.

{% highlight text %}
docker run -d --restart always --name test centos tail -f /dev/null
docker ps -a
service docker restart
docker ps -a
{% endhighlight %}

Docker 재시작 시간에 맞춰 `test` 컨테이너도 재시작된 것을 확인할 수 있다.

이 외에도 다른 재시작 옵션이 존재한다.

- `no` : 재시작하지 않는다. (기본값)
- `on-failure` : 에러로 인해 종료될 시 재시작한다.
- `always` : 항상 재시작한다. 수동으로 종료한 경우, Docker가 재시작되면 같이 재시작된다.
- `unless-stopped` : 컨테이너가 종료되지 않는다면, 항상 재시작한다. 종료되었다면, 직접 시작하기 전까지는 Docker가 재시작되도 컨테이너는 재시작되지 않는다.

자세한 내용은 [Docker Documentation][Docker Documentation]{:target="_blank"}에서 확인할 수 있다. (영어 주의 ⚠️)

## 그 외 방법

이렇게 컨테이너를 구동할 때마다 재시작 옵션을 주는 방법밖에 없을까?

조건에 Docker를 걸어둔 일종의 서비스 파일을 작성하면 가능하다.  
이는 컨테이너를 항상 재시작할 때는 문제 없지만, 개인적으로는 직접 옵션을 주는 것을 선호한다.  
옵션에 따라 원하는 동작이 명확하고, 누군가는 서비스 파일을 인지하지 못할 수도 있기 때문이다.

취향에 따라 방법을 선택해 적용하도록 한다.  
참고로 서비스 파일을 작성한다면, OS마다 서비스 등록법이 상이할 수 있으니 유의해서 적용하길 바란다.

[다음 글]: https://jamesu.dev/posts/2019/12/20/starting-service-automatically-on-boot-in-linux/
[Docker Documentation]: https://docs.docker.com/config/containers/start-containers-automatically/
