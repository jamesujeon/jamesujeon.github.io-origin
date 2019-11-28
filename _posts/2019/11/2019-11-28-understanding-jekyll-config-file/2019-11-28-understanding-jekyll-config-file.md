---
layout: post
title:  "Jekyll 환경설정 파일 이해하기"
author: "jamesujeon"
categories: [Etc, Blog]
tags: [jekyll, github-pages]
title_image: octojekyll_title.png
published: false
---

# Jekyll 환경설정 파일이란?

Jekyll은 정적 사이트 생성을 위한 다양한 옵션이 준비되어 있다.  
옵션은 루트 경로에 있는 `_config.yml` 파일에 해당하는 환경설정 파일을 통해 설정할 수 있다.  
해당 파일은 [YAML](https://ko.wikipedia.org/wiki/YAML){:target="_blank"} 형식을 따르며, YAML 문법은 정말 간단하므로 쉽게 적응할 수 있다.  
이렇게 설정한 환경설정 옵션은 **사이트 생성 시점**에 반영된다.

# _config.yml 파일 분석

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

<!-- todo: 이어서... -->
