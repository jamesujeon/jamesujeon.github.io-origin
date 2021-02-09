---
layout: post
title:  "Jekyll 환경설정 파일 이해하기"
author: "jamesujeon"
categories: [Etc, Blog]
tags: [jekyll]
---

## TL;DR

`_config.xml` 파일에 환경설정 옵션을 설정하고, `site` 변수를 통해 사용할 수 있다.

## Jekyll 환경설정 파일이란?

Jekyll은 정적 사이트 생성을 위한 다양한 옵션이 준비되어 있다.  
옵션은 루트 경로에 있는 `_config.yml` 파일에 해당하는 환경설정 파일을 통해 설정할 수 있다.  
해당 파일은 [YAML](https://ko.wikipedia.org/wiki/YAML){:target="_blank"} 형식을 따르며, YAML 문법은 정말 간단하므로 쉽게 적응할 수 있다.  
이렇게 설정한 환경설정 옵션은 **사이트 생성 시점**에 반영된다.

## `_config.yml` 파일 분석

환경설정 옵션은 Jekyll에서 제공하는 옵션, 각종 플러그인에서 사용하는 옵션, 사용자 정의 옵션이 있다.  
현재 접속해 있는 사이트의 환경설정 파일을 보면, 어떤 옵션이 있는지 확인할 수 있다.

{% highlight yaml linenos %}
# Site settings
title:          Jamesu Devlog
description:    "Dev Blog by James Minsu Jeon"
url:            "https://jamesujeon.github.io"
lang:           "ko_KR"
timezone:       "Asia/Seoul"
home_path:      "/posts"

# Google Analytics
google_analytics: UA-153146788-1

# Author
author:
  name:         jamesujeon
  email:        jamesujeon@gmail.com
  url:          https://jamesujeon.github.io

social:
  name: James Minsu Jeon
  links:
    - https://github.com/jamesujeon
    - https://www.linkedin.com/in/minsu-jeon-532282198

# Build settings
markdown:       kramdown
highlighter:    rouge
include:
  - _pages

# Assets
sass:
  sass_dir:     _sass
  style:        compressed

# Gems
plugins:
  - jekyll-feed
  - jekyll-paginate-v2
  - jekyll-seo-tag
  - jekyll-postfiles
  - jemoji

# Permalinks
permalink:      /posts/:year/:month/:day/:title/

# Pagination
pagination:
  enabled:      true
  permalink:    /p:num/
  sort_field:   "date"
  sort_reverse: true
  per_page:     5
  trail:
    before:     2
    after:      2

# Excludes
exclude:
  - Gemfile
  - Gemfile.lock
  - Rakefile
  - .backup
{% endhighlight %}

위 파일에는 Jekyll 옵션, 플러그인 옵션, 사용자 정의 옵션이 용도가 아닌 성격에 따라 구분되어 있다.  
따라서, 올바른 옵션 사용을 위해서는 **Jekyll 공식 문서** 또는 **플러그인 문서**의 확인이 반드시 필요하다.  
중복된 이름으로 사용자 정의 옵션을 정의해 사용하면, 예상치 못한 결과를 낳을 수 있기 때문이다.

예를 들어, `permalink` 옵션은 Jekyll에서 사용하는 옵션으로, 글 페이지가 생성될 때의 URL 구조를 정의한다.  
`pagination`의 하위 옵션들은 jekyll-paginate-v2 플러그인을 위한 옵션으로, 페이지 처리에 대한 옵션을 제공한다.  
마지막으로, `home_path` 옵션은 사용자가 직접 홈 경로로 이용하기 위해 설정한 사용자 정의 옵션이다.

## 환경설정 옵션 사용하기

`_config.yml` 파일에 설정한 옵션들을 직접 접근해 사용할 수 있을까?  
레이아웃을 구성할 때, [Liquid](https://shopify.github.io/liquid){:target="_blank"} 문법을 통해 사용할 수 있다.

Jekyll은 전역적인 `site` 변수를 제공한다.  
이 변수는 사이트에 대한 다양한 값에 대한 접근을 할 수 있게 해준다.  
그 중에서 앞서 설정한 옵션들도 이 변수를 통해 접근이 가능하다.

{% highlight html %}
{% raw %}
<a href="{{ site.home_path | prepend: site.baseurl }}">
  <h2 class="nav-title">(this) -> <span>Jamesu</span></h2>
</a>
{% endraw %}
{% endhighlight %}

위 코드 조각은 이 사이트의 상단에 위치하는 제목 링크를 구성하는 부분이다.  
여기서 `site.home_path`와 `site.baseurl`처럼, `site` 변수를 통해 사용자 정의 옵션인 `home_path`와 베이스 URL을 알 수 있는 `baseurl`에 접근하는 것을 볼 수 있다.

이처럼 전역 사용자 정의 옵션을 `_config.xml` 파일에 정의하면, 레이아웃 구성에 필요한 값들을 쉽게 활용할 수 있다.  
또한, 코드 중복을 피하고 가독성이 좋아지므로, 유지보수가 용이해진다.  
따라서 필요한 옵션이 있다면, `_config.xml` 파일을 적극 활용하도록 하자.
